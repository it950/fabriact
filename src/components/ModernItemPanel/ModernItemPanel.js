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
var Buttons_1 = require("../Buttons");
var Persona_1 = require("office-ui-fabric-react/lib/Persona");
require("./ModernItemPanel.module.css");
var ModernItemPanelState_1 = require("./ModernItemPanelState");
//import PlaceholderImage from './placeholder.svg';
//const logo: any = require('./placeholder.svg');
//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';
//import PlaceholderImage from '../../utilities/images/placeholder.svg';
var mobx_1 = require("mobx");
//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';
var ModernItemPanel = /** @class */ (function (_super) {
    __extends(ModernItemPanel, _super);
    function ModernItemPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.renderHeader = function () {
            return (React.createElement("span", null));
        };
        _this.renderFooter = function () {
            if (_this.props.renderFooter) {
                return _this.props.renderFooter();
            }
            return (React.createElement("span", null));
        };
        _this.config = new ModernItemPanelState_1.default(_this.props.item, _this.props.titleProperty, _this.props.descriptionProperty, _this.props.secondaryDescriptionProperty, _this.props.colorProperty, _this.props.imageProperty, _this.props.language);
        mobx_1.reaction(function () { return _this.props.item; }, function (item) {
            _this.config.item = item;
        });
        return _this;
    }
    ModernItemPanel.prototype.render = function () {
        var _this = this;
        var className = this.props.actions == null || this.props.actions.length == 0 ? "modernInnnerContent" : "modernInnnerContentActions";
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.medium, onRenderHeader: this.renderHeader, isOpen: this.props.isVisible, onLightDismissClick: this.props.onDismiss, isLightDismiss: true, className: className, onRenderFooterContent: this.renderFooter, onRenderNavigation: function () {
                return (React.createElement("div", null,
                    React.createElement("div", { className: "modernHeader", style: { backgroundColor: _this.config.color } },
                        React.createElement("div", { className: "ms-Grid modernHeaderGrid" },
                            React.createElement("div", { className: "ms-Grid-row" },
                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md3 ms-lg2" },
                                    React.createElement(Persona_1.Persona, { imageUrl: _this.config.imageError || !_this.config.image ? null : _this.config.image, onPhotoLoadingStateChange: _this.config.imageStateChanged, size: Persona_1.PersonaSize.size72, hidePersonaDetails: true })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg9" },
                                    React.createElement("div", { className: "ms-Grid" },
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                                React.createElement("div", { className: "modernfont15" }, _this.config.title))),
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12 " },
                                                React.createElement("div", { className: "modernfont13" }, _this.config.description))),
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                                React.createElement("div", { className: "modernfont15" }, _this.config.secondaryDescription))))),
                                React.createElement("div", { className: "ms-Grid-col ms-sm1" },
                                    React.createElement("div", { className: "ms-textAlignRight" },
                                        React.createElement("i", { onClick: _this.props.onDismiss, className: "ms-Icon ms-Icon--ChromeClose modernCloseButton", "aria-hidden": "true" })))))),
                    React.createElement(Buttons_1.ModernActionButtonRow, { buttons: _this.props.actions, onClick: _this.props.onActionClick })));
            } }, this.props.children));
    };
    ModernItemPanel = __decorate([
        mobx_react_1.observer
    ], ModernItemPanel);
    return ModernItemPanel;
}(React.Component));
exports.ModernItemPanel = ModernItemPanel;
//# sourceMappingURL=ModernItemPanel.js.map