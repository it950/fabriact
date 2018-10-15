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
const ModernTextField_1 = require("../ModernTextField");
let ModernPhoneEditField = class ModernPhoneEditField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(ModernTextField_1.ModernTextEditField, { field: this.props.field, icon: "Phone", errorMessage: this.props.errorMessage, onChange: this.props.onChange, value: this.props.value, validate: this.props.validate }));
    }
};
ModernPhoneEditField = __decorate([
    mobx_react_1.observer
], ModernPhoneEditField);
exports.ModernPhoneEditField = ModernPhoneEditField;
//# sourceMappingURL=ModernPhoneEditField.js.map