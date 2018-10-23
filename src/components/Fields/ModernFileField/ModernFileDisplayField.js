"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var ModernLink_1 = require("../../ModernLink");
var Buttons_1 = require("../../Buttons");
var file_saver_1 = require("file-saver");
var ModernFileDisplayField = /** @class */ (function (_super) {
    __extends(ModernFileDisplayField, _super);
    function ModernFileDisplayField(props) {
        var _this = _super.call(this, props) || this;
        _this.downloadFile = function (item) {
            file_saver_1.saveAs(item.file, item.title);
        };
        return _this;
    }
    ModernFileDisplayField.prototype.render = function () {
        var _this = this;
        if (this.props.value) {
            var result = this.props.value.map(function (v) {
                var link = v.link ? React.createElement(ModernLink_1.ModernLink, { label: v.title, url: v.link })
                    : React.createElement(Buttons_1.ModernLinkButton, { label: v.title, id: v.id, onClick: function () {
                            _this.downloadFile(v);
                        } });
                return (React.createElement("div", { className: "ms-Grid-row", key: v.id },
                    React.createElement("div", { className: "ms-Grid-col ms-sm12" }, link)));
            });
            return (React.createElement("div", { className: "ms-Grid" }, result));
        }
        return (React.createElement("span", null));
    };
    ModernFileDisplayField = __decorate([
        mobx_react_1.observer
    ], ModernFileDisplayField);
    return ModernFileDisplayField;
}(React.Component));
exports.ModernFileDisplayField = ModernFileDisplayField;
//# sourceMappingURL=ModernFileDisplayField.js.map