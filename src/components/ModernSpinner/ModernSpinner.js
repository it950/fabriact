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
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
let ModernSpinner = class ModernSpinner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const size = this.props.size != null ? this.props.size : Spinner_1.SpinnerSize.medium;
        const description = this.props.description != null ? this.props.description : "";
        return (React.createElement(Spinner_1.Spinner, { size: size, label: description }));
    }
};
ModernSpinner = __decorate([
    mobx_react_1.observer
], ModernSpinner);
exports.ModernSpinner = ModernSpinner;
//# sourceMappingURL=ModernSpinner.js.map