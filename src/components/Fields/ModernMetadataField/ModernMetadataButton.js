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
const Buttons_1 = require("../../Buttons");
let ModernMetadataButtonField = class ModernMetadataButtonField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            this.props.onClicked({ id: value, title: this.props.label });
            return value;
        };
    }
    render() {
        const html = this.props.checked ? React.createElement(Buttons_1.ModernPrimaryButton, { id: this.props.id, label: this.props.label, onClick: this.updateItem })
            : React.createElement(Buttons_1.ModernButton, { id: this.props.id, label: this.props.label, onClick: this.updateItem });
        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (React.createElement("span", null, html));
    }
};
ModernMetadataButtonField = __decorate([
    mobx_react_1.observer
], ModernMetadataButtonField);
exports.ModernMetadataButtonField = ModernMetadataButtonField;
//# sourceMappingURL=ModernMetadataButton.js.map