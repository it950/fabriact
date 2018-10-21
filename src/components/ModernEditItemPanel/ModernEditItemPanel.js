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
const ModernEditItemPanelState_1 = require("./ModernEditItemPanelState");
const mobx_1 = require("mobx");
const ModernItemPanel_1 = require("../ModernItemPanel");
const Fields_1 = require("../Fields");
const ModernForm_1 = require("../ModernForm");
const Buttons_1 = require("../Buttons");
const ModernSpinner_1 = require("../ModernSpinner");
let ModernEditItemPanel = class ModernEditItemPanel extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernEditItemPanelState_1.default(this.props.item, this.props.fields, this.props.onDismiss, this.props.onUpdateItem, this.props.language);
        mobx_1.reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
        mobx_1.reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }
    render() {
        const content = this.config.isSaving ? React.createElement(ModernSpinner_1.ModernSpinner, null) : React.createElement(ModernForm_1.ModernForm, { fields: this.props.fields, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, resolveLookup: this.props.resolveLookup, validator: this.config.validator, resolveSuggestions: this.props.resolveSuggestions, item: this.config.item });
        const titleHtml = !this.config.isSaving && this.props.title ? React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" },
                React.createElement(Fields_1.ModernFieldLabel, { label: this.props.title }))) : React.createElement("span", null);
        return (React.createElement(ModernItemPanel_1.ModernItemPanel, { item: this.config.item, isVisible: this.props.isVisible, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, onDismiss: this.props.onDismiss, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty, renderFooter: () => {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: this.config.footerButtons, onClick: this.config.onFooterButtonClick });
            } },
            React.createElement("div", { className: "ms-Grid" },
                titleHtml,
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" }, content)))));
    }
};
ModernEditItemPanel = __decorate([
    mobx_react_1.observer
], ModernEditItemPanel);
exports.ModernEditItemPanel = ModernEditItemPanel;
//# sourceMappingURL=ModernEditItemPanel.js.map