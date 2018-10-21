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
const ModernViewItemDetailState_1 = require("./ModernViewItemDetailState");
const Label_1 = require("office-ui-fabric-react/lib/Label");
let ModernViewItemDetail = class ModernViewItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernViewItemDetailState_1.default(this.props.item, this.props.authorProperty, this.props.editorProperty, this.props.createdProperty, this.props.modifiedProperty, this.props.language);
    }
    render() {
        var fields = this.config.labels.map((field, index) => {
            //var value = this.props.item ? this.props.item[field.key] : null;
            return React.createElement(Label_1.Label, { key: field }, field);
        });
        return (React.createElement("div", { className: "ms-Grid-row", style: { paddingTop: "20px" } },
            React.createElement("div", { className: "ms-Grid-col ms-sm12  " },
                React.createElement("div", { className: "ms-Grid" }, fields))));
    }
};
ModernViewItemDetail = __decorate([
    mobx_react_1.observer
], ModernViewItemDetail);
exports.ModernViewItemDetail = ModernViewItemDetail;
//# sourceMappingURL=ModernViewItemDetail.js.map