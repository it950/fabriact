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
require("./ModernActionButtonRow.module.css");
let ModernActionButtonRow = class ModernActionButtonRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const actions = this.props.buttons != null ? this.props.buttons.map(g => {
            return React.createElement("span", { key: g.key, className: "actionButtonContainer" },
                " ",
                React.createElement(__1.ModernActionButton, { label: g.name, icon: g.icon, id: g.key, onClick: this.props.onClick }));
        }) : React.createElement("span", null);
        return (React.createElement("div", { className: "actionsRow" },
            React.createElement("div", { className: "ms-Grid" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" },
                        React.createElement("div", { className: "ms-Grid" },
                            React.createElement("div", { className: "ms-Grid-row actionButtonRow" },
                                React.createElement("div", { className: "ms-Grid-col ms-sm12" }, actions))))))));
    }
};
ModernActionButtonRow = __decorate([
    mobx_react_1.observer
], ModernActionButtonRow);
exports.ModernActionButtonRow = ModernActionButtonRow;
//# sourceMappingURL=ModernActionButtonRow.js.map