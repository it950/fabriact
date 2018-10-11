"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
require("./ModernCommandBar.module.scss");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const mobx_react_1 = require("mobx-react");
let ModernCommandBar = class ModernCommandBar extends React.Component {
    //  store: ModernCommandBarStore = new ModernCommandBarStore();
    constructor(props) {
        super(props);
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
        this.renderSearch = () => {
            const searcvhValue = this.props.config.searchValue ? this.props.config.searchValue : "";
            return (React.createElement(SearchBox_1.SearchBox, { placeholder: this.props.config.searchPlaceholder, value: searcvhValue, className: "modernCommandBarSearch", onSearch: this.props.config.onSearch, onClear: this.props.config.clearSearch, onEscape: this.props.config.clearSearch }));
        };
        //  this.store.init(props);
        //this.store = new ModernCommandBarStore(props);
        //this.store = new ModernCommandBarStore();
        //reaction(() => this.viewType, (viewType) => {
        //    this.props.onViewTypeSwitch(viewType);
        //});
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
        return (React.createElement(CommandBar_1.CommandBar, { items: items, farItems: this.props.config.farItems }));
    }
};
ModernCommandBar = __decorate([
    mobx_react_1.inject("config"),
    mobx_react_1.observer
], ModernCommandBar);
exports.ModernCommandBar = ModernCommandBar;
//# sourceMappingURL=ModernCommandBar.js.map