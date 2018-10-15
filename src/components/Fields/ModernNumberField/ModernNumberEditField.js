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
const ModernEditFieldLabel_1 = require("../ModernEditFieldLabel/ModernEditFieldLabel");
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
let ModernNumberEditField = class ModernNumberEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            console.log(value);
            this.props.onChange(this.props.field.key, this.textToNumber(value));
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
    }
    textToNumber(value) {
        if (value && value.length > 0) {
            value = value.replace(",", ".");
            return parseFloat(value);
        }
        return null;
    }
    render() {
        const value = this.props.value ? this.props.value.toString() : "";
        return (React.createElement("span", null,
            React.createElement(ModernEditFieldLabel_1.ModernEditFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement(TextField_1.TextField, { description: this.props.field.description, onChanged: this.updateItem, value: value, validateOnLoad: false, validateOnFocusOut: true, onGetErrorMessage: this.getErrorMessage, errorMessage: this.props.errorMessage })));
    }
};
ModernNumberEditField = __decorate([
    mobx_react_1.observer
], ModernNumberEditField);
exports.ModernNumberEditField = ModernNumberEditField;
//# sourceMappingURL=ModernNumberEditField.js.map