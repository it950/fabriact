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
var __2 = require("../../..");
var ModernEditField = /** @class */ (function (_super) {
    __extends(ModernEditField, _super);
    function ModernEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.resolveSuggestions = function () {
            return _this.props.resolveSuggestions(_this.props.field.key);
        };
        _this.resolveLookup = function (search) {
            return _this.props.resolveLookup(_this.props.field.key, search);
        };
        return _this;
    }
    ModernEditField.prototype.render = function () {
        var html = null;
        switch (this.props.field.type) {
            case __2.ModernFieldType.text:
            case __2.ModernFieldType.url:
                html = React.createElement(__1.ModernTextEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.lookup:
            case __2.ModernFieldType.user:
                html = React.createElement(__1.ModernLookupEditField, { field: this.props.field, value: this.props.value, resolveLookup: this.resolveLookup, resolveSuggestions: this.resolveSuggestions, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.login:
                html = React.createElement(__1.ModernLoginEditField, { field: this.props.field, value: this.props.value, domain: "", validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.choice:
                html = React.createElement(__1.ModernChoiceEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.file:
                html = React.createElement(__1.ModernFileEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.multiLine:
                html = React.createElement(__1.ModernMultiLineEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.email:
                html = React.createElement(__1.ModernEmailEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.boolean:
                html = React.createElement(__1.ModernBooleanEditField, { field: this.props.field, value: this.props.value, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
                break;
            case __2.ModernFieldType.managedMetadata:
                html = React.createElement(__1.ModernMetadataEditField, { field: this.props.field, value: this.props.value, language: this.props.language, onNewOption: this.props.onNewOption, validate: this.props.validate, onChange: this.props.onChange, errorMessage: this.props.errorMessage });
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
                console.warn("FieldType " + this.props.field.type + " missing");
                break;
        }
        return (React.createElement("span", null, html));
    };
    ModernEditField = __decorate([
        mobx_react_1.observer
    ], ModernEditField);
    return ModernEditField;
}(React.Component));
exports.ModernEditField = ModernEditField;
//# sourceMappingURL=ModernEditField.js.map