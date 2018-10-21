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
require("./ModernCommandBar.module.css");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const mobx_react_1 = require("mobx-react");
const ModernCommandBarState_1 = require("./ModernCommandBarState");
const mobx_1 = require("mobx");
const ModernDeleteDialog_1 = require("../ModernDeleteDialog");
const ModernNewItemPanel_1 = require("../ModernNewItemPanel");
let ModernCommandBar = class ModernCommandBar extends React.Component {
    constructor(props) {
        super(props);
        this.renderSearch = () => {
            const searcvhValue = this.props.searchValue ? this.props.searchValue : "";
            return (React.createElement(SearchBox_1.SearchBox, { placeholder: this.config.strings.searchPlaceholder, value: searcvhValue, className: "modernSearchBox", onSearch: this.props.onSearch, onClear: this.props.onSearchCleared, onEscape: this.props.onSearchCleared }));
        };
        this.config = new ModernCommandBarState_1.default(this.props.views, this.props.onSearch, this.props.onViewClicked, this.props.onDeleteConfirmed, this.props.onViewOffsetChanged, this.props.onActionClicked, this.props.onExport, this.props.onNewItem, this.props.onSaveNewItem, this.props.getNewActionFieldGroups, this.props.getNewActionItem, this.props.onSaveNewAction, this.props.selectedItemCount, this.props.selectedViewId, this.props.hideNew, this.props.hideDelete, this.props.hideSearch, this.props.language);
        mobx_1.reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });
        mobx_1.reaction(() => this.props.selectedItemCount, (selectedItemCount) => {
            this.config.selectedItemCount = selectedItemCount;
        });
        mobx_1.reaction(() => this.props.selectedViewId, (selectedViewId) => {
            this.config.currentViewKey = selectedViewId;
        });
        mobx_1.reaction(() => this.props.views, (views) => {
            this.config.views = views;
        });
    }
    render() {
        const items = this.config.items.map(s => {
            if (s.key == "search") {
                s.onRender = this.renderSearch;
            }
            return s;
        });
        return (React.createElement("div", null,
            React.createElement(CommandBar_1.CommandBar, { items: items, farItems: this.config.farItems }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newItemFormVisible, title: this.props.newItemTitle, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewItemDismissed, item: this.config.newItem, groups: this.props.newItemGroups, onSaveNewItem: this.config.onSaveNewItem }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newActionItemFormVisible, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewActionItemDismiss, item: this.config.newActionItem, groups: this.config.newActionFields, onSaveNewItem: this.config.onSaveNewActionItem }),
            React.createElement(ModernDeleteDialog_1.ModernDeleteDialog, { isVisible: this.config.confirmDeleteDialogVisible, onConfirmed: this.config.onDeleteConfirmed, language: this.props.language, itemCount: this.config.selectedItemCount, onCanceled: this.config.onDeleteCanceled })));
    }
};
ModernCommandBar = __decorate([
    mobx_react_1.observer
], ModernCommandBar);
exports.ModernCommandBar = ModernCommandBar;
//# sourceMappingURL=ModernCommandBar.js.map