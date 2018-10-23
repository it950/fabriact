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
var ModernFieldLabel_1 = require("../ModernFieldLabel/ModernFieldLabel");
var ModernMetadataButton_1 = require("./ModernMetadataButton");
var __1 = require("../../..");
var locales_1 = require("../../../utilities/locales");
var ModernMetadataEditField = /** @class */ (function (_super) {
    __extends(ModernMetadataEditField, _super);
    function ModernMetadataEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.updateItem = function (value) {
            if (_this.props.field.multiSelect) {
                if (_this.props.value && _this.props.value.length > 0 && _this.props.value.filter(function (e) { return e.id == value.id; }).length > 0) {
                    _this.props.onChange(_this.props.field.key, _this.props.value.filter(function (r) { return r.id != value.id; }).map(function (v) {
                        return { title: v.title, id: v.id };
                    }));
                }
                else {
                    var results = _this.props.value ? _this.props.value : [];
                    var newValue = results.push(value);
                    _this.props.onChange(_this.props.field.key, results.map(function (v) {
                        return { title: v.title, id: v.id };
                    }));
                }
            }
            else {
                if (_this.props.value && _this.props.value.id == value.id) {
                    _this.props.onChange(_this.props.field.key, null);
                }
                else {
                    _this.props.onChange(_this.props.field.key, { title: value.title, id: value.id });
                }
            }
        };
        _this.addNewOption = function () {
            console.log("dasdsa");
            _this.props.onNewOption(_this.props.field.key);
        };
        _this.locale = new locales_1.default(_this.props.language);
        return _this;
    }
    ModernMetadataEditField.prototype.render = function () {
        var _this = this;
        var buttons = this.props.field.options.map(function (option) {
            var checked = (_this.props.field.multiSelect && _this.props.value && _this.props.value.length > 0 && _this.props.value.filter(function (e) { return e.id == option.id; }).length > 0)
                || (!_this.props.field.multiSelect && _this.props.value && _this.props.value.id == option.id);
            return React.createElement(ModernMetadataButton_1.ModernMetadataButtonField, { key: option.id, id: option.id, checked: checked, label: option.title, onClicked: _this.updateItem });
        });
        console.log("dasdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(this.props);
        if (this.props.field.newOptionItems) {
            buttons.push(React.createElement(__1.ModernPrimaryButton, { id: "Add", key: "Add", label: this.locale.strings.add, onClick: this.addNewOption }));
        }
        return (React.createElement("span", null,
            React.createElement(ModernFieldLabel_1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            buttons));
    };
    ModernMetadataEditField = __decorate([
        mobx_react_1.observer
    ], ModernMetadataEditField);
    return ModernMetadataEditField;
}(React.Component));
exports.ModernMetadataEditField = ModernMetadataEditField;
//# sourceMappingURL=ModernMetadataEditField.js.map