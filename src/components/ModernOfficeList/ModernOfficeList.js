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
const ModernNewFormPanel_1 = require("../ModernNewFormPanel");
const ModernDetailsList_1 = require("../ModernDetailsList");
const ModernOfficeListState_1 = require("./ModernOfficeListState");
const mobx_1 = require("mobx");
const ModernDeleteDialog_1 = require("../ModernDeleteDialog");
let ModernOfficeList = class ModernOfficeList extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernOfficeListState_1.default(this.props.items, this.props.views, this.props.newItemGroups, this.props.onSearch, this.props.onViewChange, this.props.onNewItem, this.props.onSaveNewItem, this.props.onDeleteItem, this.props.defaultView, this.props.language);
        mobx_1.reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(ModernCommandBar_1.ModernCommandBar, { actions: this.props.actions, hideDelete: !this.config.showDeleteButton, selectedViewId: this.config.currentViewId, onDeleteClicked: this.config.onDelete, onNewClicked: this.config.onNewItemClicked, onViewClicked: this.config.onViewChange, onSearch: this.config.onSearch, hideNew: this.props.hideNew, views: this.config.views }),
            React.createElement(ModernDetailsList_1.ModernDetailsList, { items: this.config.items, onSelectionChanged: this.config.onSelectionChanged, fields: this.config.viewFields }),
            React.createElement(ModernNewFormPanel_1.ModernNewFormPanel, { isVisible: this.config.newItemFormVisible, title: this.props.newItemTitle, language: this.props.language, onDismiss: this.config.onNewItemDismissed, item: this.config.newItem, groups: this.props.newItemGroups, onSaveNewItem: this.config.onSaveNewItem }),
            React.createElement(ModernDeleteDialog_1.ModernDeleteDialog, { isVisible: this.config.confirmDeleteDialogVisible, onConfirmed: this.config.onDeleteConfirmed, itemCount: this.config.selectedItemCount, onCanceled: this.config.onDeleteCanceled, language: this.props.language })));
    }
};
ModernOfficeList = __decorate([
    mobx_react_1.observer
], ModernOfficeList);
exports.ModernOfficeList = ModernOfficeList;
//# sourceMappingURL=ModernOfficeList.js.map