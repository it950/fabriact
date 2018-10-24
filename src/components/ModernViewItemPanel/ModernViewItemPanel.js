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
var ModernViewItemPanelState_1 = require("./ModernViewItemPanelState");
var mobx_1 = require("mobx");
var ModernItemPanel_1 = require("../ModernItemPanel");
var ModernViewGroup_1 = require("./ModernViewGroup");
var ModernViewItemDetail_1 = require("./ModernViewItemDetail");
var ModernEditItemPanel_1 = require("../ModernEditItemPanel");
var ModernDeleteDialog_1 = require("../ModernDeleteDialog");
var ModernSpinner_1 = require("../ModernSpinner");
var ModernNewItemPanel_1 = require("../ModernNewItemPanel");
var ModernRedirectDialog_1 = require("../ModernRedirectDialog");
var ModernViewItemPanel = /** @class */ (function (_super) {
    __extends(ModernViewItemPanel, _super);
    function ModernViewItemPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernViewItemPanelState_1.default(_this.props.item, _this.props.actions, _this.props.groups, _this.props.hideDelete, _this.props.onDismiss, _this.props.onUpdateItem, _this.props.onDeleteItem, _this.props.onGetItem, _this.props.onActionClick, _this.props.getNewActionFieldGroups, _this.props.getNewActionItem, _this.props.onSaveNewAction, _this.props.language);
        mobx_1.reaction(function () { return _this.props.item; }, function (item) {
            _this.config.item = item;
            _this.config.getItem();
        });
        mobx_1.reaction(function () { return _this.props.actions; }, function (actions) {
            _this.config.actions = actions;
        });
        mobx_1.reaction(function () { return _this.props.groups; }, function (groups) {
            _this.config.groups = groups;
        });
        return _this;
    }
    ModernViewItemPanel.prototype.render = function () {
        var _this = this;
        var groups = this.config.itemGroups ? this.config.itemGroups.map(function (group) {
            return React.createElement(ModernViewGroup_1.ModernViewGroup, { key: group.id, id: group.id, fields: group.fields, onMoreClicked: _this.config.onMoreClicked, placeholderImage: _this.props.placeholderImage, onActionClicked: _this.config.onActionClicked, onEditClicked: _this.config.onEditClicked, language: _this.props.language, item: _this.config.item, onGetFieldValue: _this.props.onGetFieldValue });
        }) : React.createElement("span", null);
        var form = this.config.isLoading ? React.createElement(ModernSpinner_1.ModernSpinner, null) :
            React.createElement("div", { className: "ms-Grid" }, groups);
        var detail = this.config.showEmbeddedFieldId ? React.createElement("span", null)
            : !this.config.isLoading ?
                React.createElement(ModernViewItemDetail_1.ModernViewItemDetail, { item: this.config.item, authorProperty: this.props.authorProperty, editorProperty: this.props.editorProperty, createdProperty: this.props.createdProperty, modifiedProperty: this.props.modifiedProperty, language: this.props.language })
                : React.createElement("span", null);
        return (React.createElement("span", null,
            React.createElement(ModernItemPanel_1.ModernItemPanel, { item: this.config.item, isVisible: this.props.isVisible, titleProperty: this.props.titleProperty, placeholderImage: this.props.placeholderImage, descriptionProperty: this.props.descriptionProperty, onDismiss: this.props.onDismiss, actions: this.config.itemActions, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, onActionClick: this.config.onPanelActionClicked, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty },
                form,
                detail,
                React.createElement(ModernDeleteDialog_1.ModernDeleteDialog, { isVisible: this.config.showDeleteConfirmation, onConfirmed: this.config.onDeleteConfirmed, itemCount: 1, onCanceled: this.config.onDeleteCanceled, language: this.props.language })),
            React.createElement(ModernEditItemPanel_1.ModernEditItemPanel, { resolveSuggestions: this.props.resolveSuggestions, item: this.config.editItem, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty, onUpdateItem: this.config.onUpdateItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, fields: this.config.editFields, onDismiss: this.config.onDismissEditForm, title: this.config.editGroupTitle, resolveLookup: this.props.resolveLookup, isVisible: this.config.editGroup != null }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newActionItemFormVisible, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewActionItemDismiss, item: this.config.newActionItem, groups: this.config.newActionFields, onSaveNewItem: this.config.onSaveNewActionItem }),
            React.createElement(ModernRedirectDialog_1.ModernRedirectDialog, { isVisible: this.config.requestRedirect, onCanceled: this.config.cancelRedirect, language: this.props.language, url: this.config.redirectUrl })));
    };
    ModernViewItemPanel = __decorate([
        mobx_react_1.observer
    ], ModernViewItemPanel);
    return ModernViewItemPanel;
}(React.Component));
exports.ModernViewItemPanel = ModernViewItemPanel;
//# sourceMappingURL=ModernViewItemPanel.js.map