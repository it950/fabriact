import * as React from 'react';
import { IModernDetailsListProps } from './IModernDetailsListProps';
import { observer } from 'mobx-react';
import { DetailsList, IColumn, IDetailsHeaderProps } from "office-ui-fabric-react/lib/DetailsList";
import { ModernSpinner } from '../ModernSpinner';
import ModernDetailsListState from './ModernDetailsListState';
import { reaction } from 'mobx';
import { ModernDisplayField } from '../Fields';
import { SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { from, Subscription } from 'rxjs';
import { IRenderFunction } from '@uifabric/utilities/lib';
import { ITooltipHostProps, TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ModernFilterPanel } from '../ModernFilterPanel';
import { ModernViewItemPanel } from '../ModernViewItemPanel';

@observer
export class ModernDetailsList extends React.Component<IModernDetailsListProps, any> {

    config: ModernDetailsListState;
    nextPageSubscription: Subscription;

    constructor(props: IModernDetailsListProps) {
        super(props);

        this.config = new ModernDetailsListState(this.props.items, this.props.currentViewItem, this.props.hasNextPage, this.props.fields,
            this.props.viewName, this.props.onSelectionChanged, this.props.onSortChanged, this.props.onFilterChanged, this.props.language);

        reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });

        reaction(() => this.props.currentViewItem, (currentViewItem) => {
            this.config.currentViewItem = currentViewItem;
        });

        reaction(() => this.props.viewName, (viewName) => {
            this.config.viewName = viewName;

            this.config.currentFilters = [];
        });

        reaction(() => this.props.hasNextPage, (hasNextPage) => {
            this.config.hasNextPage = hasNextPage;
        });

        reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }

    public renderMissingItem = (index, rowProps): React.ReactNode => {
        this.nextPageSubscription = from(this.props.onNextPage()).subscribe();

        return (
            <ModernSpinner size={SpinnerSize.small} />
        );
    }

    componentWillUnmount() {
        if (this.nextPageSubscription) {
            this.nextPageSubscription.unsubscribe();
        }
    }

    render() {
        const result = this.config.items ? <span>
            <DetailsList items={this.config.listItems} selection={this.props.selection} columns={this.config.columns}
                selectionPreservedOnEmptyClick={true} setKey={this.props.idProperty}
                onColumnHeaderClick={this.config.columnClick}
                onRenderMissingItem={this.renderMissingItem}
                onRenderDetailsHeader={
                    (detailsHeaderProps: IDetailsHeaderProps, defaultRender: IRenderFunction<IDetailsHeaderProps>) => (
                        <Sticky stickyPosition={StickyPositionType.Header}>
                            {defaultRender({
                                ...detailsHeaderProps,
                                onRenderColumnHeaderTooltip: (tooltipHostProps: ITooltipHostProps) => (
                                    <TooltipHost {...tooltipHostProps} />
                                )
                            })}
                        </Sticky>
                    )
                }

                onRenderItemColumn={(item: any, index: number, column: IColumn) => {
                    const schema = this.config.fields.find(a => a.key == column.key);

                    return (
                        <ModernDisplayField language={this.props.language} field={schema} item={item} placeholderImage={this.props.placeholderImage}
                            onGetFieldValue={this.props.onGetFieldValue} />
                    );
                }} />

            {this.config.contextualHeaderMenuProps && (
                <ContextualMenu {...this.config.contextualHeaderMenuProps} />
            )}
        </span>

            : <span><br /><ModernSpinner description={this.config.loadingText} /></span>;
        
        return (
            <span>
                {result}

                <ModernViewItemPanel item={this.config.currentViewItem} isVisible={this.config.currentViewItem} imageProperty={this.props.itemImageProperty}
                    onDismiss={this.config.onDismissViewItemPanel} groups={this.props.viewItemGroups} authorProperty={this.props.itemAuthorProperty}
                    onGetItem={this.props.onGetItem} language={this.props.language} colorProperty={this.props.itemColorProperty} onActionClick={this.props.onActionClicked}
                    editorProperty={this.props.itemEditorProperty} onGetFieldValue={this.props.onGetFieldValue} actions={this.props.viewItemActions}
                    placeholderImage={this.props.placeholderImage} hideDelete={this.props.hideDelete}
                    onSaveNewAction={this.props.onSaveNewAction} getNewActionFieldGroups={this.props.getNewActionFieldGroups} getNewActionItem={this.props.getNewActionItem}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    createdProperty={this.props.itemCreatedProperty} modifiedProperty={this.props.itemModifiedProperty} onDeleteItem={this.props.onDeleteItem}
                    resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions} onUpdateItem={this.props.onUpdateItem}
                    titleProperty={this.props.itemTitleProperty} descriptionProperty={this.props.itemDescriptionProperty}
                    secondaryDescriptionProperty={this.props.itemSecondaryDescriptionProperty} />


                <ModernFilterPanel isVisible={this.config.currentFilterField != null} getFilterOptions={this.props.getFilterOptions}
                    currentFilters={this.config.currentFilterPanelValues} language={this.props.language}
                    field={this.config.currentFilterField} onDismiss={this.config.filterDismissed} onApply={this.config.onFilterApplied} />

            </span>
        );
    }
}