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
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const ModernSpinner_1 = require("../ModernSpinner");
const ModernDetailsListState_1 = require("./ModernDetailsListState");
const mobx_1 = require("mobx");
let ModernDetailsList = class ModernDetailsList extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernDetailsListState_1.default(this.props.items, this.props.fields, this.props.onSelectionChanged);
        mobx_1.reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });
        mobx_1.reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }
    render() {
        const result = this.config.items ?
            React.createElement(DetailsList_1.DetailsList, { items: this.config.items, selection: this.config.selection, columns: this.config.columns, selectionPreservedOnEmptyClick: true })
            : React.createElement(ModernSpinner_1.ModernSpinner, null);
        return (React.createElement("span", null, result));
    }
};
ModernDetailsList = __decorate([
    mobx_react_1.observer
], ModernDetailsList);
exports.ModernDetailsList = ModernDetailsList;
//# sourceMappingURL=ModernDetailsList.js.map