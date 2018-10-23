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
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var ModernForm_1 = require("../ModernForm");
var ModernSpinner_1 = require("../ModernSpinner");
var ModernNewItemPanelState_1 = require("./ModernNewItemPanelState");
var Buttons_1 = require("../Buttons");
var mobx_1 = require("mobx");
var ModernNewItemPanel = /** @class */ (function (_super) {
    __extends(ModernNewItemPanel, _super);
    function ModernNewItemPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernNewItemPanelState_1.default(_this.props.item, _this.props.groups, _this.props.onSaveNewItem, _this.props.onDismiss, _this.props.title, _this.props.language);
        mobx_1.reaction(function () { return _this.props.item; }, function (item) {
            _this.config.item = item;
        });
        mobx_1.reaction(function () { return _this.props.groups; }, function (groups) {
            _this.config.groups = groups;
        });
        return _this;
    }
    ModernNewItemPanel.prototype.render = function () {
        var _this = this;
        var formHtml = this.config.isLoaded && !this.config.isSaving ? React.createElement(ModernForm_1.ModernForm, { fields: this.config.fields, validator: this.config.validator, resolveLookup: this.props.resolveLookup, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, resolveSuggestions: this.props.resolveSuggestions, item: this.config.item }) : React.createElement(ModernSpinner_1.ModernSpinner, null);
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.medium, headerText: this.config.panelTitle, isOpen: this.props.isVisible, onDismissed: this.config.onDismiss, onRenderFooterContent: function () {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: _this.config.footerButtons, onClick: _this.config.onFooterButtonClick });
            } },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" }, formHtml)))));
    };
    ModernNewItemPanel = __decorate([
        mobx_react_1.observer
    ], ModernNewItemPanel);
    return ModernNewItemPanel;
}(React.Component));
exports.ModernNewItemPanel = ModernNewItemPanel;
//# sourceMappingURL=ModernNewItemPanel.js.map