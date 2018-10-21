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
const TextField_1 = require("office-ui-fabric-react/lib/TextField");
const __1 = require("..");
let ModernPercentEditField = class ModernPercentEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            this.props.onChange(this.props.field.key, value != null ? parseFloat(value) / 100 : null);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
    }
    render() {
        const value = this.props.value != null ? (this.props.value * 100).toString() : "";
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement(TextField_1.TextField, { description: this.props.field.description, onChanged: this.updateItem, value: value, suffix: '%', validateOnLoad: false, validateOnFocusOut: true, onGetErrorMessage: this.getErrorMessage, errorMessage: this.props.errorMessage })));
    }
};
ModernPercentEditField = __decorate([
    mobx_react_1.observer
], ModernPercentEditField);
exports.ModernPercentEditField = ModernPercentEditField;
//# sourceMappingURL=ModernPercentEditField.js.map