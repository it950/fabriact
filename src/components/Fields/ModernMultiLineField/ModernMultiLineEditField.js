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
let ModernMultiLineEditField = class ModernMultiLineEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            this.props.onChange(this.props.field.key, value);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
    }
    render() {
        const value = this.props.value ? this.props.value : "";
        return (React.createElement("span", null,
            React.createElement(ModernEditFieldLabel_1.ModernEditFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement(TextField_1.TextField, { description: this.props.field.description, onChanged: this.updateItem, value: value, autoAdjustHeight: true, multiline: true, validateOnLoad: false, validateOnFocusOut: true, onGetErrorMessage: this.getErrorMessage, errorMessage: this.props.errorMessage })));
    }
};
ModernMultiLineEditField = __decorate([
    mobx_react_1.observer
], ModernMultiLineEditField);
exports.ModernMultiLineEditField = ModernMultiLineEditField;
//# sourceMappingURL=ModernMultiLineEditField.js.map