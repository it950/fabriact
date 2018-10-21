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
const ModernViewItemPanelState_1 = require("./ModernViewItemPanelState");
const mobx_1 = require("mobx");
const ModernItemPanel_1 = require("../ModernItemPanel");
const ModernViewGroup_1 = require("./ModernViewGroup");
const ModernViewItemDetail_1 = require("./ModernViewItemDetail");
const ModernEditItemPanel_1 = require("../ModernEditItemPanel");
const ModernDeleteDialog_1 = require("../ModernDeleteDialog");
const ModernSpinner_1 = require("../ModernSpinner");
const ModernNewItemPanel_1 = require("../ModernNewItemPanel");
const ModernRedirectDialog_1 = require("../ModernRedirectDialog");
let ModernViewItemPanel = class ModernViewItemPanel extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernViewItemPanelState_1.default(this.props.item, this.props.actions, this.props.groups, this.props.hideDelete, this.props.onDismiss, this.props.onUpdateItem, this.props.onDeleteItem, this.props.onGetItem, this.props.onActionClick, this.props.getNewActionFieldGroups, this.props.getNewActionItem, this.props.onSaveNewAction, this.props.language);
        mobx_1.reaction(() => this.props.item, (item) => {
            this.config.item = item;
            this.config.getItem();
        });
        mobx_1.reaction(() => this.props.actions, (actions) => {
            this.config.actions = actions;
        });
        mobx_1.reaction(() => this.props.groups, (groups) => {
            this.config.groups = groups;
        });
    }
    render() {
        const groups = this.config.itemGroups ? this.config.itemGroups.map((group) => {
            return React.createElement(ModernViewGroup_1.ModernViewGroup, { key: group.id, id: group.id, fields: group.fields, onMoreClicked: this.config.onMoreClicked, onActionClicked: this.config.onActionClicked, onEditClicked: this.config.onEditClicked, language: this.props.language, item: this.config.item, onGetFieldValue: this.props.onGetFieldValue });
        }) : React.createElement("span", null);
        const form = this.config.isLoading ? React.createElement(ModernSpinner_1.ModernSpinner, null) :
            React.createElement("div", { className: "ms-Grid" }, groups);
        const detail = this.config.showEmbeddedFieldId ? React.createElement("span", null)
            : !this.config.isLoading ?
                React.createElement(ModernViewItemDetail_1.ModernViewItemDetail, { item: this.config.item, authorProperty: this.props.authorProperty, editorProperty: this.props.editorProperty, createdProperty: this.props.createdProperty, modifiedProperty: this.props.modifiedProperty, language: this.props.language })
                : React.createElement("span", null);
        return (React.createElement("span", null,
            React.createElement(ModernItemPanel_1.ModernItemPanel, { item: this.config.item, isVisible: this.props.isVisible, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, onDismiss: this.props.onDismiss, actions: this.config.itemActions, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, onActionClick: this.config.onPanelActionClicked, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty },
                form,
                detail,
                React.createElement(ModernDeleteDialog_1.ModernDeleteDialog, { isVisible: this.config.showDeleteConfirmation, onConfirmed: this.config.onDeleteConfirmed, itemCount: 1, onCanceled: this.config.onDeleteCanceled, language: this.props.language })),
            React.createElement(ModernEditItemPanel_1.ModernEditItemPanel, { resolveSuggestions: this.props.resolveSuggestions, item: this.config.editItem, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty, onUpdateItem: this.config.onUpdateItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, fields: this.config.editFields, onDismiss: this.config.onDismissEditForm, title: this.config.editGroupTitle, resolveLookup: this.props.resolveLookup, isVisible: this.config.editGroup != null }),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { isVisible: this.config.newActionItemFormVisible, language: this.props.language, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, onDismiss: this.config.onNewActionItemDismiss, item: this.config.newActionItem, groups: this.config.newActionFields, onSaveNewItem: this.config.onSaveNewActionItem }),
            React.createElement(ModernRedirectDialog_1.ModernRedirectDialog, { isVisible: this.config.requestRedirect, onCanceled: this.config.cancelRedirect, language: this.props.language, url: this.config.redirectUrl })));
    }
};
ModernViewItemPanel = __decorate([
    mobx_react_1.observer
], ModernViewItemPanel);
exports.ModernViewItemPanel = ModernViewItemPanel;
//# sourceMappingURL=ModernViewItemPanel.js.map