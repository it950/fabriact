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
const mobx_1 = require("mobx");
const Fields_1 = require("../Fields");
const ModernFormState_1 = require("./ModernFormState");
const ModernNewItemPanel_1 = require("../ModernNewItemPanel");
let ModernForm = class ModernForm extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernFormState_1.default(this.props.item, this.props.fields, this.props.getNewOptionFieldGroups, this.props.getNewOptionItem, this.props.onSaveNewOption, this.props.language, this.props.validator);
        mobx_1.reaction(() => this.props.fields, (fields) => {
            this.config.validator.fields = fields;
        });
    }
    render() {
        const fields = this.config.fields ? this.config.fields.map(t => {
            const value = this.config.item && this.config.item[t.key] ? this.config.item[t.key] : null;
            const errorMessage = this.config.errorMessages && this.config.errorMessages.find(i => i.field == t.key) != null ?
                this.config.errorMessages.find(i => i.field == t.key).error : null;
            return React.createElement(Fields_1.ModernEditField, { field: t, value: value, key: t.key, onChange: this.config.onFieldChange, onNewOption: this.config.onNewOption, errorMessage: errorMessage, language: this.props.language, validate: this.config.validator.validateFormField, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions });
        }) : React.createElement("span", null);
        return (React.createElement("span", null,
            React.createElement("form", null, fields),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { resolveSuggestions: this.props.resolveSuggestions, onDismiss: this.config.onDismissNewOption, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewItem: this.config.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, groups: this.config.newOptionFields, item: this.config.newOptionItem, resolveLookup: this.props.resolveLookup, isVisible: this.config.newOptionFieldId != null })));
    }
};
ModernForm = __decorate([
    mobx_react_1.observer
], ModernForm);
exports.ModernForm = ModernForm;
//# sourceMappingURL=ModernForm.js.map