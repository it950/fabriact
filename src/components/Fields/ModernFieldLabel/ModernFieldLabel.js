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
const Label_1 = require("office-ui-fabric-react/lib/Label");
require("./ModernFieldLabel.module.css");
let ModernFieldLabel = class ModernFieldLabel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //className={styles.psaLabel}
        return (React.createElement(Label_1.Label, { className: "modernFieldLabel", required: this.props.required, key: this.props.label }, this.props.label));
    }
};
ModernFieldLabel = __decorate([
    mobx_react_1.observer
], ModernFieldLabel);
exports.ModernFieldLabel = ModernFieldLabel;
//# sourceMappingURL=ModernFieldLabel.js.map