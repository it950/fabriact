import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernViewItemPanelProps } from './IModernViewItemPanelProps';
import ModernViewItemPanelState from './ModernViewItemPanelState';
import { reaction } from 'mobx';
import { ModernItemPanel } from '../ModernItemPanel';
import { ModernViewGroup } from './ModernViewGroup';
import { ModernViewItemDetail } from './ModernViewItemDetail';
import { ModernEditItemPanel } from '../ModernEditItemPanel';
import { ModernDeleteDialog } from '../ModernDeleteDialog';
import { ModernSpinner } from '../ModernSpinner';
import { ModernNewItemPanel } from '../ModernNewItemPanel';
import { ModernRedirectDialog } from '../ModernRedirectDialog';
import { ModernCustomActionPanel } from '../ModernCustomActionPanel';

@observer
export class ModernViewItemPanel extends React.Component<IModernViewItemPanelProps, any> {

    config: ModernViewItemPanelState;

    constructor(props: IModernViewItemPanelProps) {
        super(props);

        this.config = new ModernViewItemPanelState(this.props.item, this.props.actions, this.props.groups, this.props.hideDelete,
            this.props.onDismiss, this.props.onUpdateItem, this.props.onDeleteItem, this.props.onGetItem, this.props.onActionClick, this.props.getNewActionFieldGroups,
            this.props.getNewActionItem, this.props.onSaveNewAction, this.props.language);

        reaction(() => this.props.item, (item) => {
            this.config.item = item;
            this.config.getItem();
        });

        reaction(() => this.props.actions, (actions) => {
            this.config.actions = actions;
        });

        reaction(() => this.props.groups, (groups) => {
            this.config.groups = groups;
        });

        reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });

    }

    render() {
        const groups = this.config.itemGroups ? this.config.itemGroups.map((group) => {
            return <ModernViewGroup key={group.id} id={group.id} fields={group.fields} onMoreClicked={this.config.onMoreClicked} placeholderImage={this.props.placeholderImage}
                onActionClicked={this.config.onActionClicked} onEditClicked={this.config.onEditClicked} language={this.props.language}
                item={this.config.item} onGetFieldValue={this.props.onGetFieldValue} />;
        }) : <span></span>;

        const form = this.config.isLoading ? <ModernSpinner /> :
            <div className={"ms-Grid"}>
                {groups}
             
            </div>;  

        const detail = this.config.showEmbeddedFieldId ? <span></span>
            : !this.config.isLoading ?
            <ModernViewItemDetail item={this.config.item} authorProperty={this.props.authorProperty} editorProperty={this.props.editorProperty}
                    createdProperty={this.props.createdProperty} modifiedProperty={this.props.modifiedProperty} language={this.props.language} />
                : <span></span>;

        return (
            <span>
                <ModernItemPanel item={this.config.item} isVisible={this.props.isVisible} titleProperty={this.props.titleProperty}
                    placeholderImage={this.props.placeholderImage}
                descriptionProperty={this.props.descriptionProperty} onDismiss={this.props.onDismiss} actions={this.config.itemActions}
                secondaryDescriptionProperty={this.props.secondaryDescriptionProperty} onActionClick={this.config.onPanelActionClicked}
                colorProperty={this.props.colorProperty} imageProperty={this.props.imageProperty} >

                {form}

                {detail}

                <ModernDeleteDialog isVisible={this.config.showDeleteConfirmation} onConfirmed={this.config.onDeleteConfirmed}
                    itemCount={1} onCanceled={this.config.onDeleteCanceled} language={this.props.language} />

                </ModernItemPanel>

                <ModernEditItemPanel resolveSuggestions={this.props.resolveSuggestions} item={this.config.editItem} titleProperty={this.props.titleProperty}
                    descriptionProperty={this.props.descriptionProperty} secondaryDescriptionProperty={this.props.secondaryDescriptionProperty}
                    colorProperty={this.props.colorProperty} imageProperty={this.props.imageProperty} onUpdateItem={this.config.onUpdateItem}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    fields={this.config.editFields} onDismiss={this.config.onDismissEditForm} title={this.config.editGroupTitle}
                    resolveLookup={this.props.resolveLookup} isVisible={this.config.editGroup != null} />

                <ModernNewItemPanel isVisible={this.config.newActionItemFormVisible} language={this.props.language}
                    resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    onDismiss={this.config.onNewActionItemDismiss} item={this.config.newActionItem} groups={this.config.newActionFields}
                    onSaveNewItem={this.config.onSaveNewActionItem} />

                <ModernCustomActionPanel isVisible={this.config.customActionPanelVisible} item={this.config.item} titleProperty={this.props.titleProperty}
                    action={this.config.currentAction}
                    descriptionProperty={this.props.descriptionProperty} secondaryDescriptionProperty={this.props.secondaryDescriptionProperty} renderCustomAction={this.props.renderCustomAction}
                    colorProperty={this.props.colorProperty} imageProperty={this.props.imageProperty} onDismiss={this.config.onCustomActionDismiss} />

                <ModernRedirectDialog isVisible={this.config.requestRedirect} onCanceled={this.config.cancelRedirect}
                    language={this.props.language} url={this.config.redirectUrl} />

            </span>
        );
    }
}