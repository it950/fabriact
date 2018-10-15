import * as React from 'react';
import { observer, Provider } from 'mobx-react';
import { IModernOfficeListProps } from './IModernOfficeListProps';
import { ModernCommandBar } from '../ModernCommandBar';
import { ModernNewFormPanel } from '../ModernNewFormPanel';
import { ModernDetailsList } from '../ModernDetailsList';
import ModernOfficeListState from './ModernOfficeListState';
import { reaction } from 'mobx';
import { ModernDeleteDialog } from '../ModernDeleteDialog';

@observer
export class ModernOfficeList extends React.Component<IModernOfficeListProps, any> {

    config: ModernOfficeListState;

    constructor(props: IModernOfficeListProps) {
        super(props);

        this.config = new ModernOfficeListState(this.props.items, this.props.views, this.props.newItemGroups, this.props.onSearch,
            this.props.onViewChange, this.props.onNewItem, this.props.onSaveNewItem, this.props.onDeleteItem,
            this.props.defaultView, this.props.language);

        reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });

    }

    render() {

        return (
            <div>
                <ModernCommandBar actions={this.props.actions} hideDelete={!this.config.showDeleteButton}
                    selectedViewId={this.config.currentViewId} onDeleteClicked={this.config.onDelete}
                    onNewClicked={this.config.onNewItemClicked} onViewClicked={this.config.onViewChange} onSearch={this.config.onSearch}
                    hideNew={this.props.hideNew} views={this.config.views} />

                <ModernDetailsList items={this.config.items} onSelectionChanged={this.config.onSelectionChanged} fields={this.config.viewFields} />

                <ModernNewFormPanel isVisible={this.config.newItemFormVisible} title={this.props.newItemTitle} language={this.props.language}
                    onDismiss={this.config.onNewItemDismissed} item={this.config.newItem} groups={this.props.newItemGroups} onSaveNewItem={this.config.onSaveNewItem} />

                <ModernDeleteDialog isVisible={this.config.confirmDeleteDialogVisible} onConfirmed={this.config.onDeleteConfirmed}
                    itemCount={this.config.selectedItemCount} onCanceled={this.config.onDeleteCanceled} language={this.props.language} />

            </div>
        );
    }
}