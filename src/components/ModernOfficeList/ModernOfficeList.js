"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const ModernCommandBar_1 = require("../ModernCommandBar");
const ModernDetailsList_1 = require("../ModernDetailsList");
const ModernOfficeListState_1 = require("./ModernOfficeListState");
const ScrollablePane_1 = require("office-ui-fabric-react/lib/ScrollablePane");
require("./ModernOfficeList.module.css");
const mobx_1 = require("mobx");
const rxjs_1 = require("rxjs");
const Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
let ModernOfficeList = class ModernOfficeList extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernOfficeListState_1.default(this.props.items, this.props.hasNextPage, this.props.views, this.props.itemIdProperty, this.props.hideDelete, this.props.onNextPage, this.props.onSearch, this.props.onViewChange, this.props.onNewItem, this.props.onSaveNewItem, this.props.onDeleteItem, this.props.onUpdateItem, this.props.onViewOffsetChange, this.props.onSortChanged, this.props.onFilterChanged, this.props.defaultView, this.props.language);
        mobx_1.reaction(() => this.props.views, (views) => {
            this.config.views = views;
        });
        mobx_1.reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });
    }
    componentDidMount() {
        rxjs_1.from(this.config.onViewChange(this.config.currentViewId)).subscribe();
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(ScrollablePane_1.ScrollablePane, { className: "modernScrollableHeader" },
                React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Header },
                    React.createElement(ModernCommandBar_1.ModernCommandBar, { hideDelete: !this.config.showDeleteButton, onActionClicked: this.props.onActionClicked, selectedItemCount: this.config.selectedItemCount, selectedViewId: this.config.currentViewId, onDeleteConfirmed: this.config.onDeleteConfirmed, onViewOffsetChanged: this.config.onViewOffsetChange, onNewItem: this.props.onNewItem, onSaveNewItem: this.props.onSaveNewItem, onSaveNewAction: this.props.onSaveNewAction, getNewActionFieldGroups: this.props.getNewActionFieldGroups, getNewActionItem: this.props.getNewActionItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, newItemGroups: this.props.newItemGroups, newItemTitle: this.props.newItemTitle, onViewClicked: this.config.onViewChange, onSearch: this.config.onSearch, onExport: this.props.onExport, searchValue: this.config.searchValue, onSearchCleared: this.config.onSearchCleared, language: this.props.language, hideNew: this.props.hideNew, views: this.config.currentViews })),
                React.createElement(ModernDetailsList_1.ModernDetailsList, { items: this.config.items, onSelectionChanged: this.config.onSelectionChanged, selection: this.config.selection, onActionClicked: this.props.onActionClicked, onDeleteItem: this.config.onDeleteItem, onGetItem: this.props.onGetItem, currentViewItem: this.config.currentViewItem, getNewActionFieldGroups: this.props.getNewActionFieldGroups, getNewActionItem: this.props.getNewActionItem, onSaveNewAction: this.props.onSaveNewAction, onSaveNewOption: this.props.onSaveNewOption, onUpdateItem: this.config.onUpdateItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, getNewOptionItem: this.props.getNewOptionItem, itemAuthorProperty: this.props.itemAuthorProperty, itemColorProperty: this.props.itemColorProperty, itemDescriptionProperty: this.props.itemDescriptionProperty, itemCreatedProperty: this.props.itemCreatedProperty, itemIdProperty: this.props.itemIdProperty, itemTitleProperty: this.props.itemTitleProperty, itemModifiedProperty: this.props.itemModifiedProperty, itemSecondaryDescriptionProperty: this.props.itemSecondaryDescriptionProperty, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, itemEditorProperty: this.props.itemEditorProperty, itemImageProperty: this.props.itemImageProperty, viewItemActions: this.props.viewItemActions, viewItemGroups: this.props.viewItemGroups, onSortChanged: this.config.onSortChanged, getFilterOptions: this.props.getFilterOptions, onFilterChanged: this.config.onFilterChanged, hasNextPage: this.props.hasNextPage, onGetFieldValue: this.props.onGetFieldValue, idProperty: this.props.itemIdProperty, language: this.props.language, fields: this.config.viewFields, viewName: this.config.currentViewName, onNextPage: this.config.getNextPage }))));
    }
};
ModernOfficeList = __decorate([
    mobx_react_1.observer
], ModernOfficeList);
exports.ModernOfficeList = ModernOfficeList;
//# sourceMappingURL=ModernOfficeList.js.map