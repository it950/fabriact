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
require("./ModernViewGroup.module.css");
const Buttons_1 = require("../Buttons");
const locales_1 = require("../../utilities/locales");
let ModernViewGroupFieldButton = class ModernViewGroupFieldButton extends React.Component {
    constructor(props) {
        super(props);
        this.onMoreClicked = () => {
            this.props.onMoreClicked(this.props.field.key);
        };
        this.locale = new locales_1.default(this.props.language);
    }
    render() {
        let content = React.createElement("span", null);
        if (this.props.field.editGroupTrigger) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: "Edit", onClick: this.props.onEditClicked, label: this.locale.strings.edit });
        }
        if (this.props.field.embeddedFields) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: "More", onClick: this.onMoreClicked, label: this.locale.strings.more });
        }
        if (this.props.field.action) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: this.props.field.action.key, onClick: this.props.onActionClicked, label: this.props.field.action.name });
        }
        return (React.createElement("span", null, content));
    }
};
ModernViewGroupFieldButton = __decorate([
    mobx_react_1.observer
], ModernViewGroupFieldButton);
exports.ModernViewGroupFieldButton = ModernViewGroupFieldButton;
//# sourceMappingURL=ModernViewGroupFieldButton.js.map