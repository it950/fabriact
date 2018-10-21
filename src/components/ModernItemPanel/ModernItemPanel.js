"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const Panel_1 = require("office-ui-fabric-react/lib/Panel");
const Buttons_1 = require("../Buttons");
const Persona_1 = require("office-ui-fabric-react/lib/Persona");
require("./ModernItemPanel.module.css");
const ModernItemPanelState_1 = require("./ModernItemPanelState");
//import PlaceholderImage from './placeholder.svg';
//const logo: any = require('./placeholder.svg');
//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';
//import PlaceholderImage from '../../utilities/images/placeholder.svg';
const mobx_1 = require("mobx");
//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';
let ModernItemPanel = class ModernItemPanel extends React.Component {
    constructor(props) {
        super(props);
        this.renderHeader = () => {
            return (React.createElement("span", null));
        };
        this.renderFooter = () => {
            if (this.props.renderFooter) {
                return this.props.renderFooter();
            }
            return (React.createElement("span", null));
        };
        this.config = new ModernItemPanelState_1.default(this.props.item, this.props.titleProperty, this.props.descriptionProperty, this.props.secondaryDescriptionProperty, this.props.colorProperty, this.props.imageProperty, this.props.language);
        mobx_1.reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
    }
    render() {
        const className = this.props.actions == null || this.props.actions.length == 0 ? "modernInnnerContent" : "modernInnnerContentActions";
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.medium, onRenderHeader: this.renderHeader, isOpen: this.props.isVisible, onLightDismissClick: this.props.onDismiss, isLightDismiss: true, className: className, onRenderFooterContent: this.renderFooter, onRenderNavigation: () => {
                return (React.createElement("div", null,
                    React.createElement("div", { className: "modernHeader", style: { backgroundColor: this.config.color } },
                        React.createElement("div", { className: "ms-Grid modernHeaderGrid" },
                            React.createElement("div", { className: "ms-Grid-row" },
                                React.createElement("div", { className: "ms-Grid-col ms-sm3 ms-md3 ms-lg2" },
                                    React.createElement(Persona_1.Persona, { imageUrl: this.config.imageError || !this.config.image ? null : this.config.image, onPhotoLoadingStateChange: this.config.imageStateChanged, size: Persona_1.PersonaSize.size72, hidePersonaDetails: true })),
                                React.createElement("div", { className: "ms-Grid-col ms-sm8 ms-md8 ms-lg9" },
                                    React.createElement("div", { className: "ms-Grid" },
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                                React.createElement("div", { className: "modernfont15" }, this.config.title))),
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12 " },
                                                React.createElement("div", { className: "modernfont13" }, this.config.description))),
                                        React.createElement("div", { className: "ms-Grid-row" },
                                            React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                                                React.createElement("div", { className: "modernfont15" }, this.config.secondaryDescription))))),
                                React.createElement("div", { className: "ms-Grid-col ms-sm1" },
                                    React.createElement("div", { className: "ms-textAlignRight" },
                                        React.createElement("i", { onClick: this.props.onDismiss, className: "ms-Icon ms-Icon--ChromeClose modernCloseButton", "aria-hidden": "true" })))))),
                    React.createElement(Buttons_1.ModernActionButtonRow, { buttons: this.props.actions, onClick: this.props.onActionClick })));
            } }, this.props.children));
    }
};
ModernItemPanel = __decorate([
    mobx_react_1.observer
], ModernItemPanel);
exports.ModernItemPanel = ModernItemPanel;
//# sourceMappingURL=ModernItemPanel.js.map