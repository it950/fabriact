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
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var ModernBooleanEditField = /** @class */ (function (_super) {
    __extends(ModernBooleanEditField, _super);
    function ModernBooleanEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.updateItem = function (value, checked) {
            console.log(checked);
            _this.props.onChange(_this.props.field.key, checked);
            return value;
        };
        _this.getErrorMessage = function (value) {
            return _this.props.validate(_this.props.field, value);
        };
        return _this;
    }
    ModernBooleanEditField.prototype.render = function () {
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement(Checkbox_1.Checkbox, { onChange: this.updateItem, defaultChecked: this.props.value })));
    };
    ModernBooleanEditField = __decorate([
        mobx_react_1.observer
    ], ModernBooleanEditField);
    return ModernBooleanEditField;
}(React.Component));
exports.ModernBooleanEditField = ModernBooleanEditField;
//# sourceMappingURL=ModernBooleanEditField.js.map