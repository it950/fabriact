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
let ModernLink = class ModernLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Link_1.Link, { href: this.props.url }, this.props.label));
    }
};
ModernLink = __decorate([
    mobx_react_1.observer
], ModernLink);
exports.ModernLink = ModernLink;
//# sourceMappingURL=ModernLink.js.map