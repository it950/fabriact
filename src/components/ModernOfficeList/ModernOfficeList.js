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
var mobx_react_1 = require("mobx-react");
var ModernCommandBar_1 = require("../ModernCommandBar");
var ModernDetailsList_1 = require("../ModernDetailsList");
var ModernOfficeListState_1 = require("./ModernOfficeListState");
var ScrollablePane_1 = require("office-ui-fabric-react/lib/ScrollablePane");
require("./ModernOfficeList.module.css");
var mobx_1 = require("mobx");
var rxjs_1 = require("rxjs");
var Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
var ModernProgressBar_1 = require("../ModernProgressBar");
var ModernOfficeList = /** @class */ (function (_super) {
    __extends(ModernOfficeList, _super);
    function ModernOfficeList(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernOfficeListState_1.default(_this.props.items, _this.props.hasNextPage, _this.props.views, _this.props.itemIdProperty, _this.props.hideDelete, _this.props.itemTitleProperty, _this.props.onNextPage, _this.props.onSearch, _this.props.onViewChange, _this.props.onNewItem, _this.props.onSaveNewItem, _this.props.onDeleteItem, _this.props.onUpdateItem, _this.props.onViewOffsetChange, _this.props.onSortChanged, _this.props.onFilterChanged, _this.props.onActionClicked, _this.props.getNewActionFieldGroups, _this.props.getNewActionItem, _this.props.onSaveNewAction, _this.props.defaultView, _this.props.language);
        mobx_1.reaction(function () { return _this.props.views; }, function (views) {
            _this.config.views = views;
        });
        mobx_1.reaction(function () { return _this.props.hideDelete; }, function (hideDelete) {
            _this.config.hideDelete = hideDelete;
        });
        return _this;
    }
    ModernOfficeList.prototype.componentDidMount = function () {
        rxjs_1.from(this.config.onViewChange(this.config.currentViewId)).subscribe();
    };
    ModernOfficeList.prototype.render = function () {
        var content = this.config.showProgress ? React.createElement(ModernProgressBar_1.ModernProgressBar, { percentComplete: this.config.currentProgress, description: this.config.processProgress.description, title: this.config.processProgress.title }) :
            React.createElement(ModernDetailsList_1.ModernDetailsList, { items: this.config.items, onSelectionChanged: this.config.onSelectionChanged, selection: this.config.selection, onActionClicked: this.props.onActionClicked, onDeleteItem: this.config.onDeleteItem, onGetItem: this.props.onGetItem, currentViewItem: this.config.currentViewItem, placeholderImage: this.props.placeholderImage, getNewActionFieldGroups: this.props.getNewActionFieldGroups, getNewActionItem: this.props.getNewActionItem, onSaveNewAction: this.props.onSaveNewAction, onSaveNewOption: this.props.onSaveNewOption, onUpdateItem: this.config.onUpdateItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, getNewOptionItem: this.props.getNewOptionItem, itemAuthorProperty: this.props.itemAuthorProperty, itemColorProperty: this.props.itemColorProperty, itemDescriptionProperty: this.props.itemDescriptionProperty, itemCreatedProperty: this.props.itemCreatedProperty, itemIdProperty: this.props.itemIdProperty, itemTitleProperty: this.props.itemTitleProperty, itemModifiedProperty: this.props.itemModifiedProperty, itemSecondaryDescriptionProperty: this.props.itemSecondaryDescriptionProperty, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, itemEditorProperty: this.props.itemEditorProperty, itemImageProperty: this.props.itemImageProperty, viewItemActions: this.props.viewItemActions, viewItemGroups: this.props.viewItemGroups, onSortChanged: this.config.onSortChanged, getFilterOptions: this.props.getFilterOptions, onFilterChanged: this.config.onFilterChanged, hasNextPage: this.props.hasNextPage, onGetFieldValue: this.props.onGetFieldValue, idProperty: this.props.itemIdProperty, language: this.props.language, fields: this.config.viewFields, viewName: this.config.currentViewName, onNextPage: this.config.getNextPage });
        return (React.createElement("div", null,
            React.createElement(ScrollablePane_1.ScrollablePane, { className: "modernScrollableHeader" },
                React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Header },
                    React.createElement(ModernCommandBar_1.ModernCommandBar, { hideDelete: !this.config.showDeleteButton, onActionClicked: this.config.onActionClicked, selectedItemCount: this.config.selectedItemCount, selectedViewId: this.config.currentViewId, onDeleteConfirmed: this.config.onDeleteConfirmed, onViewOffsetChanged: this.config.onViewOffsetChange, onNewItem: this.props.onNewItem, onSaveNewItem: this.props.onSaveNewItem, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, onSaveNewAction: this.config.onActionSaved, getNewActionFieldGroups: this.config.getNewActionFieldGroups, getNewActionItem: this.config.getNewActionItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, newItemGroups: this.props.newItemGroups, newItemTitle: this.props.newItemTitle, onViewClicked: this.config.onViewChange, onSearch: this.config.onSearch, onExport: this.props.onExport, searchValue: this.config.searchValue, onSearchCleared: this.config.onSearchCleared, language: this.props.language, hideNew: this.props.hideNew, views: this.config.currentViews })),
                content)));
    };
    ModernOfficeList = __decorate([
        mobx_react_1.observer
    ], ModernOfficeList);
    return ModernOfficeList;
}(React.Component));
exports.ModernOfficeList = ModernOfficeList;
//# sourceMappingURL=ModernOfficeList.js.map