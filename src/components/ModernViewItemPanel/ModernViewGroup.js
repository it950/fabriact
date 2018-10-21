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
const Fields_1 = require("../Fields");
const ModernFieldLabel_1 = require("../Fields/ModernFieldLabel");
const ModernViewGroupFieldButton_1 = require("./ModernViewGroupFieldButton");
const Label_1 = require("office-ui-fabric-react/lib/Label");
let ModernViewGroup = class ModernViewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onGroupEdit = () => {
            this.props.onEditClicked(this.props.id);
        };
    }
    render() {
        var fields = this.props.item != null ? this.props.fields.map((field, index) => {
            return React.createElement("div", { className: "ms-Grid-row", key: field.key },
                React.createElement("div", { className: "ms-Grid-col ms-sm4" },
                    React.createElement(ModernFieldLabel_1.ModernFieldLabel, { label: field.name })),
                React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                    React.createElement(Label_1.Label, null,
                        React.createElement(Fields_1.ModernDisplayField, { item: this.props.item, field: field, onGetFieldValue: this.props.onGetFieldValue, language: this.props.language }))),
                React.createElement("div", { className: "ms-Grid-col ms-sm2" },
                    React.createElement(ModernViewGroupFieldButton_1.ModernViewGroupFieldButton, { field: field, onActionClicked: this.props.onActionClicked, language: this.props.language, onEditClicked: this.onGroupEdit, onMoreClicked: this.props.onMoreClicked })));
        }) : React.createElement("span", null);
        return (React.createElement("div", { className: "ms-Grid-row viewGroup" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12  " },
                React.createElement("div", { className: "ms-Grid" }, fields))));
    }
};
ModernViewGroup = __decorate([
    mobx_react_1.observer
], ModernViewGroup);
exports.ModernViewGroup = ModernViewGroup;
//# sourceMappingURL=ModernViewGroup.js.map