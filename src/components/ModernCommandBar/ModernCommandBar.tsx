import * as React from 'react';
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import './ModernCommandBar.module.scss';
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IModernCommandBarProps } from './IModernCommandBarProps';
import { computed, observable, action, reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import ModernCommandBarStore from './ModernCommandBarStore';

@inject("config")
@observer
export class ModernCommandBar extends React.Component<IModernCommandBarProps, any> {

  //  store: ModernCommandBarStore = new ModernCommandBarStore();

    constructor(props: IModernCommandBarProps) {
        super(props);
      //  this.store.init(props);
        //this.store = new ModernCommandBarStore(props);
        //this.store = new ModernCommandBarStore();
        //reaction(() => this.viewType, (viewType) => {
        //    this.props.onViewTypeSwitch(viewType);
        //});

    }

    //private actionClicked = (action) => {
    //    this.props.onActionClicked(action);
    //}

    //private newClicked = () => {
    //    this.props.onNewClicked();
    //}

    //private deleteClicked = () => {
    //    this.props.onDeleteClicked();
    //}

    //private clear = () => {
    //    if (this.props.onSearchCleared) {
    //        this.props.onSearchCleared();
    //    }
    //}

    //private search = (value) => {
    //    if (this.props.onSearch) {
    //        this.props.onSearch(value);
    //    }
    //}

    private renderSearch = () => {
        const searcvhValue = this.props.config.searchValue ? this.props.config.searchValue : "";

        return (
            <SearchBox placeholder={this.props.config.searchPlaceholder} value={searcvhValue}
                className={"modernCommandBarSearch"} onSearch={this.props.config.onSearch} onClear={this.props.config.clearSearch}
                onEscape={this.props.config.clearSearch} />
        );
    }

    //@observable
    //private viewType: number = 0;

    //@observable
    //private currentViewId: string;

    //@action
    //private showListView = () => {
    //    this.viewType = 0;
    //}

    //@action
    //private showTileView = () => {
    //    this.viewType = 1;
    //}

    //@computed
    //get currentViewName() {
    //    if (this.currentViewId) {
    //        return this.props.views.find(g => g.id == this.currentViewId).name;
    //    }

    //    return null;
    //}


    //@computed
    //get icon() {
    //    let icon = this.viewType == 0 ? 'List' : 'GridViewMedium';

    //    return icon;
    //}

    //@computed
    //get actions() {
    //    let items = this.props.actions.map(t => {
    //        t.onClick = () => {
    //            this.actionClicked(t.key);
    //        };

    //        return t;
    //    });

    //    items = !this.props.hideNew ? [{
    //        key: "new",
    //        icon: "Add",
    //        name: "New",
    //        onClick: this.newClicked
    //    }].concat(items) : items;

    //    items = !this.props.hideSearch ? [{
    //        key: "search",
    //        onRender: this.renderSearch
    //    }].concat(items) : items;

    //    items = !this.props.hideDelete ? items.concat([{
    //        key: "delete",
    //        icon: "Delete",
    //        name: "Delete",
    //        onClick: this.deleteClicked
    //    }]) : items;

    //    return items;
    //}

    //@computed
    //get farItems() {
    //    const icon = this.viewType == 0 ? 'List' : 'GridViewMedium';
    //    var typeItems: any[] =
    //        [
    //            {
    //                key: "List",
    //                name: "List",
    //                icon: "List",
    //                canCheck: true,
    //                checked: this.viewType == 0,
    //                onClick: this.showListView
    //            },
    //            {
    //                key: "Tiles",
    //                name: "Tiles",
    //                icon: "GridViewMedium",
    //                canCheck: true,
    //                checked: this.viewType == 1,
    //                onClick: this.showTileView
    //            },
    //            {
    //                key: 'divider_1',
    //                itemType: ContextualMenuItemType.Divider
    //            }
    //        ];


    //    let items = typeItems.concat(this.props.views.map(t => {
    //        t.onClick = () => {
    //            this.actionClicked(t.key);
    //        };

    //        return t;
    //    }));

    //    let menu: any[] = [
    //        {
    //            key: 'currentView',
    //            name: this.currentViewName,
    //            icon: icon,
    //            subMenuProps: {
    //                items: items,
    //            }
    //        }
    //    ];

    //    return menu;
    //}

    render() {

        const items = this.props.config.items.map(s => {
            if (s.key == "search") {
                s.onRender = this.renderSearch;
            }

            return s;
        });

        return (
            <CommandBar items={items} farItems={this.props.config.farItems} ></CommandBar>
        );
    }
}