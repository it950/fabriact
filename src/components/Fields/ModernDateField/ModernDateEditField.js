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
var __1 = require("..");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var __2 = require("..");
var ModernDateEditField = /** @class */ (function (_super) {
    __extends(ModernDateEditField, _super);
    function ModernDateEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.updateItem = function (value) {
            console.log(value);
            _this.props.onChange(_this.props.field.key, value);
            return value;
        };
        _this.getErrorMessage = function (value) {
            return _this.props.validate(_this.props.field, value);
        };
        _this.onClear = function () {
            _this.props.onChange(_this.props.field.key, null);
        };
        return _this;
    }
    ModernDateEditField.prototype.render = function () {
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
    };
    ModernDateEditField = __decorate([
        mobx_react_1.observer
    ], ModernDateEditField);
    return ModernDateEditField;
}(React.Component));
exports.ModernDateEditField = ModernDateEditField;
//# sourceMappingURL=ModernDateEditField.js.map