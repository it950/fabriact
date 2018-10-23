"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
require("./ModernCommandBar.module.css");
var SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
var mobx_react_1 = require("mobx-react");
var ModernCommandBarState_1 = require("./ModernCommandBarState");
var mobx_1 = require("mobx");
var ModernDeleteDialog_1 = require("../ModernDeleteDialog");
var ModernNewItemPanel_1 = require("../ModernNewItemPanel");
var ModernCommandBar = /** @class */ (function (_super) {
    __extends(ModernCommandBar, _super);
    function ModernCommandBar(props) {
        var _this = _super.call(this, props) || this;
        _this.renderSearch = function () {
            var searcvhValue = _this.props.searchValue ? _this.props.searchValue : "";
            return (React.createElement(SearchBox_1.SearchBox, { placeholder: _this.config.strings.searchPlaceholder, value: searcvhValue, className: "modernSearchBox", onSearch: _this.props.onSearch, onClear: _this.props.onSearchCleared, onEscape: _this.props.onSearchCleared }));
        };
        _this.config = new ModernCommandBarState_1.default(_this.props.views, _this.props.onSearch, _this.props.onViewClicked, _this.props.onDeleteConfirmed, _this.props.onViewOffsetChanged, _this.props.onActionClicked, _this.props.onExport, _this.props.onNewItem, _this.props.onSaveNewItem, _this.props.getNewActionFieldGroups, _this.props.getNewActionItem, _this.props.onSaveNewAction, _this.props.selectedItemCount, _this.props.selectedViewId, _this.props.hideNew, _this.props.hideDelete, _this.props.hideSearch, _this.props.language);
        mobx_1.reaction(function () { return _this.props.hideDelete; }, function (hideDelete) {
            _this.config.hideDelete = hideDelete;
        });
        mobx_1.reaction(function () { return _this.props.selectedItemCount; }, function (selectedItemCount) {
            _this.config.selectedItemCount = selectedItemCount;
        });
        mobx_1.reaction(function () { return _this.props.selectedViewId; }, function (selectedViewId) {
            _this.config.currentViewKey = selectedViewId;
        });
        mobx_1.reaction(function () { return _this.props.views; }, function (views) {
            _this.config.views = views;
        });
        return _this;
    }
    ModernCommandBar.prototype.render = function () {
        var _this = this;
        var items = this.config.items.map(function (s) {
            if (s.key == "search") {
                s.onRender = _this.renderSearch;
            }
            return s;
        });
        return (React.createElement("div", null,
            React.createElement(CommandBar_1.CommandBar, { items: items, farItems: this.config.farItems }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newItemFormVisible, title: this.props.newItemTitle, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewItemDismissed, item: this.config.newItem, groups: this.props.newItemGroups, onSaveNewItem: this.config.onSaveNewItem }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newActionItemFormVisible, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewActionItemDismiss, item: this.config.newActionItem, groups: this.config.newActionFields, onSaveNewItem: this.config.onSaveNewActionItem }),
            React.createElement(ModernDeleteDialog_1.ModernDeleteDialog, { isVisible: this.config.confirmDeleteDialogVisible, onConfirmed: this.config.onDeleteConfirmed, language: this.props.language, itemCount: this.config.selectedItemCount, onCanceled: this.config.onDeleteCanceled })));
    };
    ModernCommandBar = __decorate([
        mobx_react_1.observer
    ], ModernCommandBar);
    return ModernCommandBar;
}(React.Component));
exports.ModernCommandBar = ModernCommandBar;
//# sourceMappingURL=ModernCommandBar.js.map