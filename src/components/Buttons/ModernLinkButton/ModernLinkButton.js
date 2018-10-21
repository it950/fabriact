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
const Link_1 = require("office-ui-fabric-react/lib/Link");
let ModernLinkButton = class ModernLinkButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            this.props.onClick(this.props.id);
        };
    }
    render() {
        return (React.createElement(Link_1.Link, { onClick: this.onClick, href: "#" }, this.props.label));
    }
};
ModernLinkButton = __decorate([
    mobx_react_1.observer
], ModernLinkButton);
exports.ModernLinkButton = ModernLinkButton;
//# sourceMappingURL=ModernLinkButton.js.map