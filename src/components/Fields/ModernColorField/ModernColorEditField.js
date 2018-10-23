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
var ColorPicker_1 = require("office-ui-fabric-react/lib/ColorPicker");
var __1 = require("..");
var ModernColorEditField = /** @class */ (function (_super) {
    __extends(ModernColorEditField, _super);
    function ModernColorEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.updateItem = function (value) {
            _this.props.onChange(_this.props.field.key, value);
            return value;
        };
        return _this;
    }
    ModernColorEditField.prototype.render = function () {
        var value = this.props.value ? this.props.value : "";
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            React.createElement(ColorPicker_1.ColorPicker, { onColorChanged: this.updateItem, color: value })));
    };
    ModernColorEditField = __decorate([
        mobx_react_1.observer
    ], ModernColorEditField);
    return ModernColorEditField;
}(React.Component));
exports.ModernColorEditField = ModernColorEditField;
//# sourceMappingURL=ModernColorEditField.js.map