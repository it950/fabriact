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
var ModernMetadataDisplayField = /** @class */ (function (_super) {
    __extends(ModernMetadataDisplayField, _super);
    function ModernMetadataDisplayField(props) {
        return _super.call(this, props) || this;
    }
    ModernMetadataDisplayField.prototype.render = function () {
        var value = this.props.value ? this.props.value.constructor == Array ? this.props.value.map(function (b) { return b.title; }).join(", ") : this.props.value.title : "";
        return (React.createElement("span", null, value));
    };
    ModernMetadataDisplayField = __decorate([
        mobx_react_1.observer
    ], ModernMetadataDisplayField);
    return ModernMetadataDisplayField;
}(React.Component));
exports.ModernMetadataDisplayField = ModernMetadataDisplayField;
//# sourceMappingURL=ModernMetadataDisplayField.js.map