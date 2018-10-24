import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernOfficeListProps } from './IModernOfficeListProps';
import { ModernCommandBar } from '../ModernCommandBar';
import { ModernDetailsList } from '../ModernDetailsList';
import ModernOfficeListState from './ModernOfficeListState';
import { ScrollablePane } from "office-ui-fabric-react/lib/ScrollablePane";
import './ModernOfficeList.module.css';
import { reaction } from 'mobx';
import { from } from 'rxjs';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';

@observer
export class ModernOfficeList extends React.Component<IModernOfficeListProps, any> {

    config: ModernOfficeListState;

    constructor(props: IModernOfficeListProps) {
        super(props);

        this.config = new ModernOfficeListState(this.props.items, this.props.hasNextPage, this.props.views, this.props.itemIdProperty, this.props.hideDelete,
            this.props.onNextPage,
            this.props.onSearch,
            this.props.onViewChange, this.props.onNewItem, this.props.onSaveNewItem, this.props.onDeleteItem, this.props.onUpdateItem, this.props.onViewOffsetChange,
            this.props.onSortChanged, this.props.onFilterChanged, this.props.onActionClicked, this.props.getNewActionFieldGroups, this.props.getNewActionItem,
            this.props.defaultView, this.props.language);

        reaction(() => this.props.views, (views) => {
            this.config.views = views;
        });


        reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });

    }

    componentDidMount() {
        from(this.config.onViewChange(this.config.currentViewId)).subscribe();
    }

    render() {

        return (
            <div>
                <ScrollablePane className={"modernScrollableHeader"} >
                    <Sticky stickyPosition={StickyPositionType.Header}>
                        <ModernCommandBar hideDelete={!this.config.showDeleteButton} onActionClicked={this.config.onActionClicked} selectedItemCount={this.config.selectedItemCount}
                            selectedViewId={this.config.currentViewId} onDeleteConfirmed={this.config.onDeleteConfirmed} onViewOffsetChanged={this.config.onViewOffsetChange}
                            onNewItem={this.props.onNewItem} onSaveNewItem={this.props.onSaveNewItem}
                            onSaveNewAction={this.props.onSaveNewAction} getNewActionFieldGroups={this.config.getNewActionFieldGroups} getNewActionItem={this.config.getNewActionItem}
                            getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                            newItemGroups={this.props.newItemGroups} newItemTitle={this.props.newItemTitle}
                            onViewClicked={this.config.onViewChange} onSearch={this.config.onSearch} onExport={this.props.onExport}
                            searchValue={this.config.searchValue} onSearchCleared={this.config.onSearchCleared} language={this.props.language}
                                hideNew={this.props.hideNew} views={this.config.currentViews} />
                    </Sticky>

                    <ModernDetailsList items={this.config.items} onSelectionChanged={this.config.onSelectionChanged} selection={this.config.selection}
                        onActionClicked={this.props.onActionClicked} onDeleteItem={this.config.onDeleteItem} onGetItem={this.props.onGetItem}
                        currentViewItem={this.config.currentViewItem}
                        placeholderImage={this.props.placeholderImage}
                        getNewActionFieldGroups={this.props.getNewActionFieldGroups} getNewActionItem={this.props.getNewActionItem} onSaveNewAction={this.props.onSaveNewAction}
                        onSaveNewOption={this.props.onSaveNewOption} onUpdateItem={this.config.onUpdateItem} getNewOptionFieldGroups={this.props.getNewOptionFieldGroups}
                        getNewOptionItem={this.props.getNewOptionItem} itemAuthorProperty={this.props.itemAuthorProperty} itemColorProperty={this.props.itemColorProperty}
                        itemDescriptionProperty={this.props.itemDescriptionProperty} itemCreatedProperty={this.props.itemCreatedProperty}
                        itemIdProperty={this.props.itemIdProperty} itemTitleProperty={this.props.itemTitleProperty} itemModifiedProperty={this.props.itemModifiedProperty}
                        itemSecondaryDescriptionProperty={this.props.itemSecondaryDescriptionProperty}
                        resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions} itemEditorProperty={this.props.itemEditorProperty}
                        itemImageProperty={this.props.itemImageProperty} viewItemActions={this.props.viewItemActions} viewItemGroups={this.props.viewItemGroups}
                        onSortChanged={this.config.onSortChanged} getFilterOptions={this.props.getFilterOptions} onFilterChanged={this.config.onFilterChanged}
                        hasNextPage={this.props.hasNextPage} onGetFieldValue={this.props.onGetFieldValue} idProperty={this.props.itemIdProperty} language={this.props.language}
                        fields={this.config.viewFields} viewName={this.config.currentViewName} onNextPage={this.config.getNextPage} />

                </ScrollablePane>
            </div>
        );
    }
}