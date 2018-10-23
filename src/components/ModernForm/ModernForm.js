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
var mobx_1 = require("mobx");
var Fields_1 = require("../Fields");
var ModernFormState_1 = require("./ModernFormState");
var ModernNewItemPanel_1 = require("../ModernNewItemPanel");
var ModernForm = /** @class */ (function (_super) {
    __extends(ModernForm, _super);
    function ModernForm(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernFormState_1.default(_this.props.item, _this.props.fields, _this.props.getNewOptionFieldGroups, _this.props.getNewOptionItem, _this.props.onSaveNewOption, _this.props.language, _this.props.validator);
        mobx_1.reaction(function () { return _this.props.fields; }, function (fields) {
            _this.config.validator.fields = fields;
        });
        return _this;
    }
    ModernForm.prototype.render = function () {
        var _this = this;
        var fields = this.config.fields ? this.config.fields.map(function (t) {
            var value = _this.config.item && _this.config.item[t.key] ? _this.config.item[t.key] : null;
            var errorMessage = _this.config.errorMessages && _this.config.errorMessages.find(function (i) { return i.field == t.key; }) != null ?
                _this.config.errorMessages.find(function (i) { return i.field == t.key; }).error : null;
            return React.createElement(Fields_1.ModernEditField, { field: t, value: value, key: t.key, onChange: _this.config.onFieldChange, onNewOption: _this.config.onNewOption, errorMessage: errorMessage, language: _this.props.language, validate: _this.config.validator.validateFormField, resolveLookup: _this.props.resolveLookup, resolveSuggestions: _this.props.resolveSuggestions });
        }) : React.createElement("span", null);
        return (React.createElement("span", null,
            React.createElement("form", null, fields),
            React.createElement(ModernNewItemPanel_1.ModernNewItemPanel, { resolveSuggestions: this.props.resolveSuggestions, onDismiss: this.config.onDismissNewOption, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewItem: this.config.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, groups: this.config.newOptionFields, item: this.config.newOptionItem, resolveLookup: this.props.resolveLookup, isVisible: this.config.newOptionFieldId != null })));
    };
    ModernForm = __decorate([
        mobx_react_1.observer
    ], ModernForm);
    return ModernForm;
}(React.Component));
exports.ModernForm = ModernForm;
//# sourceMappingURL=ModernForm.js.map