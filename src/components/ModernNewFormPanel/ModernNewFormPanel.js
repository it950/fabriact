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
const ModernEditForm_1 = require("../ModernEditForm");
const ModernSpinner_1 = require("../ModernSpinner");
const ModernNewFormPanelState_1 = require("./ModernNewFormPanelState");
const Buttons_1 = require("../Buttons");
const mobx_1 = require("mobx");
let ModernNewFormPanel = class ModernNewFormPanel extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernNewFormPanelState_1.default(this.props.item, this.props.groups, this.props.onSaveNewItem, this.props.onDismiss, this.props.title, this.props.language);
        mobx_1.reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
    }
    render() {
        const formHtml = this.config.isLoaded && !this.config.isSaving ? React.createElement(ModernEditForm_1.ModernEditForm, { fields: this.config.fields, onValidated: this.config.onValidated, forceValidation: this.config.forceValidation, item: this.config.item }) : React.createElement(ModernSpinner_1.ModernSpinner, null);
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.medium, headerText: this.config.panelTitle, isOpen: this.props.isVisible, onDismissed: this.config.onDismiss, onRenderFooterContent: () => {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: this.config.footerButtons, onClick: this.config.onFooterButtonClick });
            } },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10" }, formHtml)))));
    }
};
ModernNewFormPanel = __decorate([
    mobx_react_1.observer
], ModernNewFormPanel);
exports.ModernNewFormPanel = ModernNewFormPanel;
//# sourceMappingURL=ModernNewFormPanel.js.map