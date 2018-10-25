import * as React from 'react';
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import './ModernCommandBar.module.css';
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IModernCommandBarProps } from './IModernCommandBarProps';
import { observer } from 'mobx-react';
import ModernCommandBarState from './ModernCommandBarState';
import { reaction } from 'mobx';
import { ModernDeleteDialog } from '../ModernDeleteDialog';
import { ModernNewItemPanel } from '../ModernNewItemPanel';

@observer
export class ModernCommandBar extends React.Component<IModernCommandBarProps, any> {

    config: ModernCommandBarState;

    constructor(props: IModernCommandBarProps) {
        super(props);

        this.config = new ModernCommandBarState(this.props.views, this.props.onSearch, this.props.onViewClicked, this.props.onDeleteConfirmed, this.props.onViewOffsetChanged,
            this.props.onActionClicked, this.props.onExport, this.props.onNewItem, this.props.onSaveNewItem, this.props.getNewActionFieldGroups, this.props.getNewActionItem,
            this.props.onSaveNewAction, this.props.selectedItemCount,
            this.props.selectedViewId, this.props.hideNew, this.props.hideDelete, this.props.hideSearch, this.props.language);

        reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });

     

        reaction(() => this.props.selectedItemCount, (selectedItemCount) => {
            this.config.selectedItemCount = selectedItemCount;
        });

        reaction(() => this.props.selectedViewId, (selectedViewId) => {
            this.config.currentViewKey = selectedViewId;
        });

        reaction(() => this.props.views, (views) => {
            this.config.views = views;
        });
    }

    private renderSearch = () => {
        const searcvhValue = this.props.searchValue ? this.props.searchValue : "";

        return (
            <SearchBox placeholder={this.config.strings.searchPlaceholder} value={searcvhValue}
                className={"modernSearchBox"} onSearch={this.props.onSearch} onClear={this.props.onSearchCleared}
                onEscape={this.props.onSearchCleared} />
        );
    }

    render() {
        
        const items = this.config.items.map(s => {
            if (s.key == "search") {
                s.onRender = this.renderSearch;
            }

            return s;
        });

        return (
            <div>
                <CommandBar items={items} farItems={this.config.farItems} />

                <ModernNewItemPanel isVisible={this.config.newItemFormVisible} title={this.props.newItemTitle} language={this.props.language}
                    resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    onDismiss={this.config.onNewItemDismissed} item={this.config.newItem} groups={this.props.newItemGroups} onSaveNewItem={this.config.onSaveNewItem} />

                <ModernNewItemPanel isVisible={this.config.newActionItemFormVisible} language={this.props.language}
                    resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    onDismiss={this.config.onNewActionItemDismiss} item={this.config.newActionItem} groups={this.config.newActionFields}
                    onSaveNewItem={this.config.onSaveNewActionItem} />

                <ModernDeleteDialog isVisible={this.config.confirmDeleteDialogVisible} onConfirmed={this.config.onDeleteConfirmed} language={this.props.language}
                        itemCount={this.config.selectedItemCount} onCanceled={this.config.onDeleteCanceled} />
            </div>

        );
    }
}