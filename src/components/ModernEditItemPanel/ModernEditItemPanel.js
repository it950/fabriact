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
var ModernEditItemPanelState_1 = require("./ModernEditItemPanelState");
var mobx_1 = require("mobx");
var ModernItemPanel_1 = require("../ModernItemPanel");
var Fields_1 = require("../Fields");
var ModernForm_1 = require("../ModernForm");
var Buttons_1 = require("../Buttons");
var ModernSpinner_1 = require("../ModernSpinner");
var ModernEditItemPanel = /** @class */ (function (_super) {
    __extends(ModernEditItemPanel, _super);
    function ModernEditItemPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernEditItemPanelState_1.default(_this.props.item, _this.props.fields, _this.props.onDismiss, _this.props.onUpdateItem, _this.props.language);
        mobx_1.reaction(function () { return _this.props.item; }, function (item) {
            _this.config.item = item;
        });
        mobx_1.reaction(function () { return _this.props.fields; }, function (fields) {
            _this.config.fields = fields;
        });
        return _this;
    }
    ModernEditItemPanel.prototype.render = function () {
        var _this = this;
        var content = this.config.isSaving ? React.createElement(ModernSpinner_1.ModernSpinner, null) : React.createElement(ModernForm_1.ModernForm, { fields: this.props.fields, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, resolveLookup: this.props.resolveLookup, validator: this.config.validator, resolveSuggestions: this.props.resolveSuggestions, item: this.config.item });
        var titleHtml = !this.config.isSaving && this.props.title ? React.createElement("div", { className: "ms-Grid-row" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" },
                React.createElement(Fields_1.ModernFieldLabel, { label: this.props.title }))) : React.createElement("span", null);
        return (React.createElement(ModernItemPanel_1.ModernItemPanel, { item: this.config.item, isVisible: this.props.isVisible, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, onDismiss: this.props.onDismiss, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty, renderFooter: function () {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: _this.config.footerButtons, onClick: _this.config.onFooterButtonClick });
            } },
            React.createElement("div", { className: "ms-Grid" },
                titleHtml,
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" }, content)))));
    };
    ModernEditItemPanel = __decorate([
        mobx_react_1.observer
    ], ModernEditItemPanel);
    return ModernEditItemPanel;
}(React.Component));
exports.ModernEditItemPanel = ModernEditItemPanel;
//# sourceMappingURL=ModernEditItemPanel.js.map