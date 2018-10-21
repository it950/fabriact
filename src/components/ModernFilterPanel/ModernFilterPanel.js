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
const Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
const ModernSpinner_1 = require("../ModernSpinner");
const ModernFilterPanelState_1 = require("./ModernFilterPanelState");
const Buttons_1 = require("../Buttons");
require("./ModernFilterPanel.module.css");
const mobx_1 = require("mobx");
let ModernFilterPanel = class ModernFilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernFilterPanelState_1.default(this.props.field, this.props.currentFilters, this.props.onApply, this.props.onDismiss, this.props.getFilterOptions, this.props.language);
        mobx_1.reaction(() => this.props.field, (field) => {
            this.config.field = field;
            this.config.getOptions();
        });
        mobx_1.reaction(() => this.props.currentFilters, (currentFilters) => {
            this.config.currentFilters = currentFilters;
        });
    }
    render() {
        const formHtml = this.config.isLoaded ? this.config.options.map(s => {
            return React.createElement("div", { className: "modernFilterPadding", key: s.id },
                React.createElement(Checkbox_1.Checkbox, { label: s.title, onChange: (ev, isChecked) => {
                        this.config.update(s.id, isChecked);
                    }, checked: s.isChecked, ariaDescribedBy: 'descriptionID' }));
        }) : React.createElement(ModernSpinner_1.ModernSpinner, null);
        return (React.createElement(Panel_1.Panel, { type: Panel_1.PanelType.smallFixedFar, headerText: this.config.panelTitle, isOpen: this.props.isVisible, onDismissed: this.config.onDismiss, onRenderFooterContent: () => {
                return React.createElement(Buttons_1.ModernButtonRow, { buttons: this.config.footerButtons, onClick: this.config.onFooterButtonClick });
            } }, formHtml));
    }
};
ModernFilterPanel = __decorate([
    mobx_react_1.observer
], ModernFilterPanel);
exports.ModernFilterPanel = ModernFilterPanel;
//# sourceMappingURL=ModernFilterPanel.js.map