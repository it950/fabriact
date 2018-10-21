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
let ModernChoiceDisplayField = class ModernChoiceDisplayField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let html = React.createElement("span", null);
        if (this.props.value) {
            if (this.props.value.constructor === Array) {
                var lal = this.props.value.map(t => {
                    return t.title;
                }).join(", ");
                html = lal;
            }
            else {
                html = this.props.value.title;
            }
        }
        return (React.createElement("span", null, html));
    }
};
ModernChoiceDisplayField = __decorate([
    mobx_react_1.observer
], ModernChoiceDisplayField);
exports.ModernChoiceDisplayField = ModernChoiceDisplayField;
//# sourceMappingURL=ModernChoiceDisplayField.js.map