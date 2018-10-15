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
const __1 = require("..");
const __2 = require("../../..");
let ModernEditField = class ModernEditField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let html = null;
        switch (this.props.field.type) {
            case __2.ModernFieldType.text:
                html = React.createElement(__1.ModernTextEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.multiLine:
                html = React.createElement(__1.ModernMultiLineEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.email:
                html = React.createElement(__1.ModernEmailEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.managedMetadata:
                html = React.createElement(__1.ModernMetadataEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.phone:
                html = React.createElement(__1.ModernPhoneEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.dateTime:
                html = React.createElement(__1.ModernDateEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.currency:
                html = React.createElement(__1.ModernCurrencyEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.integer:
                html = React.createElement(__1.ModernNumberEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.percent:
                html = React.createElement(__1.ModernPercentEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.number:
                html = React.createElement(__1.ModernNumberEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            default:
                console.warn("FieldType missing");
                break;
        }
        return (React.createElement("span", null, html));
    }
};
ModernEditField = __decorate([
    mobx_react_1.observer
], ModernEditField);
exports.ModernEditField = ModernEditField;
//# sourceMappingURL=ModernEditField.js.map