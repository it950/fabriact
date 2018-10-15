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
let ModernDateDisplayField = class ModernDateDisplayField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var result = this.props.value != null ? `€ ${this.props.value.toLocaleString("nl-NL")}` : React.createElement("span", null);
        return (React.createElement("span", null, result));
    }
};
ModernDateDisplayField = __decorate([
    mobx_react_1.observer
], ModernDateDisplayField);
exports.ModernDateDisplayField = ModernDateDisplayField;
//# sourceMappingURL=ModernDateDisplayField.js.map