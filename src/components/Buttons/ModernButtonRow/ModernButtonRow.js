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
const __1 = require("..");
require("./ModernButtonRow.module.css");
let ModernButtonRow = class ModernButtonRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const buttonsHtml = this.props.buttons ? this.props.buttons.map(b => {
            const buttonHtml = b.isPrimary ? React.createElement(__1.ModernPrimaryButton, { label: b.text, id: b.id, onClick: this.props.onClick })
                : React.createElement(__1.ModernButton, { label: b.text, id: b.id, onClick: this.props.onClick });
            return React.createElement("span", { key: b.id, className: "modernButtonRowPadding" }, buttonHtml);
        }) : React.createElement("span", null);
        return (React.createElement("span", null, buttonsHtml));
    }
};
ModernButtonRow = __decorate([
    mobx_react_1.observer
], ModernButtonRow);
exports.ModernButtonRow = ModernButtonRow;
//# sourceMappingURL=ModernButtonRow.js.map