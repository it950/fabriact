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
const ModernLink_1 = require("../../ModernLink");
const Buttons_1 = require("../../Buttons");
const file_saver_1 = require("file-saver");
let ModernFileDisplayField = class ModernFileDisplayField extends React.Component {
    constructor(props) {
        super(props);
        this.downloadFile = (item) => {
            file_saver_1.saveAs(item.file, item.title);
        };
    }
    render() {
        if (this.props.value) {
            let result = this.props.value.map(v => {
                const link = v.link ? React.createElement(ModernLink_1.ModernLink, { label: v.title, url: v.link })
                    : React.createElement(Buttons_1.ModernLinkButton, { label: v.title, id: v.id, onClick: () => {
                            this.downloadFile(v);
                        } });
                return (React.createElement("div", { className: "ms-Grid-row", key: v.id },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, link)));
            });
            return (React.createElement("div", { className: "ms-Grid" }, result));
        }
        return (React.createElement("span", null));
    }
};
ModernFileDisplayField = __decorate([
    mobx_react_1.observer
], ModernFileDisplayField);
exports.ModernFileDisplayField = ModernFileDisplayField;
//# sourceMappingURL=ModernFileDisplayField.js.map