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
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
var ModernSpinner_1 = require("../ModernSpinner");
var ModernFilterPanelState_1 = require("./ModernFilterPanelState");
var Buttons_1 = require("../Buttons");
require("./ModernFilterPanel.module.css");
var mobx_1 = require("mobx");
var ModernFilterPanel = /** @class */ (function (_super) {
    __extends(ModernFilterPanel, _super);
    function ModernFilterPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernFilterPanelState_1.default(_this.props.field, _this.props.currentFilters, _this.props.onApply, _this.props.onDismiss, _this.props.getFilterOptions, _this.props.language);
        mobx_1.reaction(function () { return _this.props.field; }, function (field) {
            _this.config.field = field;
            _this.config.getOptions();
        });
        mobx_1.reaction(function () { return _this.props.currentFilters; }, function (currentFilters) {
            _this.config.currentFilters = currentFilters;
        });
        return _this;
    }
    ModernFilterPanel.prototype.render = function () {
        var _this = this;
        var formHtml = this.config.isLoaded ? this.config.options.map(function (s) {
            return React.createElement("div", { className: "modernFilterPadding", key: s.id },
                React.createElement(Checkbox_1.Checkbox, { label: s.title, onChange: function (ev, isChecked) {
                        _this.config.update(s.id, isChecked);
                    }, checked: s.isChecked, ariaDescribedBy: 'descriptionID' }));
        }) : React.createElement(ModernSpinner_1.ModernSpinner, null);
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.smallFixedFar, headerText: this.config.panelTitle, isOpen: this.props.isVisible, onDismissed: this.config.onDismiss, onRenderFooterContent: function () {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: _this.config.footerButtons, onClick: _this.config.onFooterButtonClick });
            } }, formHtml));
    };
    ModernFilterPanel = __decorate([
        mobx_react_1.observer
    ], ModernFilterPanel);
    return ModernFilterPanel;
}(React.Component));
exports.ModernFilterPanel = ModernFilterPanel;
//# sourceMappingURL=ModernFilterPanel.js.map