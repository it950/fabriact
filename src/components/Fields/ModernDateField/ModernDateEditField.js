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
const Button_1 = require("office-ui-fabric-react/lib/Button");
const __2 = require("..");
let ModernDateEditField = class ModernDateEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            console.log(value);
            this.props.onChange(this.props.field.key, value);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
        this.onClear = () => {
            this.props.onChange(this.props.field.key, null);
        };
    }
    render() {
        var clearButton = !this.props.field.required && this.props.value != null ?
            React.createElement(Button_1.IconButton, { onClick: this.onClear, iconProps: { iconName: 'Clear' } })
            : React.createElement("span", null);
        //placeholder={this.props.placeholder}
        var field = React.createElement(__2.ModernDatePicker, { onChange: this.updateItem, value: this.props.value });
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement("div", { className: "ms-Grid-row" },
                React.createElement("div", { className: "ms-Grid-col ms-sm11" }, field),
                React.createElement("div", { className: "ms-Grid-col ms-sm1" },
                    React.createElement("div", { className: "ms-textAlignRight" }, clearButton)))));
    }
};
ModernDateEditField = __decorate([
    mobx_react_1.observer
], ModernDateEditField);
exports.ModernDateEditField = ModernDateEditField;
//# sourceMappingURL=ModernDateEditField.js.map