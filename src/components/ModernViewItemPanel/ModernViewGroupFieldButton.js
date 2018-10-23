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
require("./ModernViewGroup.module.css");
var Buttons_1 = require("../Buttons");
var locales_1 = require("../../utilities/locales");
var ModernViewGroupFieldButton = /** @class */ (function (_super) {
    __extends(ModernViewGroupFieldButton, _super);
    function ModernViewGroupFieldButton(props) {
        var _this = _super.call(this, props) || this;
        _this.onMoreClicked = function () {
            _this.props.onMoreClicked(_this.props.field.key);
        };
        _this.locale = new locales_1.default(_this.props.language);
        return _this;
    }
    ModernViewGroupFieldButton.prototype.render = function () {
        var content = React.createElement("span", null);
        if (this.props.field.editGroupTrigger) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: "Edit", onClick: this.props.onEditClicked, label: this.locale.strings.edit });
        }
        if (this.props.field.embeddedFields) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: "More", onClick: this.onMoreClicked, label: this.locale.strings.more });
        }
        if (this.props.field.action) {
            content = React.createElement(Buttons_1.ModernLinkButton, { id: this.props.field.action.key, onClick: this.props.onActionClicked, label: this.props.field.action.name });
        }
        return (React.createElement("span", null, content));
    };
    ModernViewGroupFieldButton = __decorate([
        mobx_react_1.observer
    ], ModernViewGroupFieldButton);
    return ModernViewGroupFieldButton;
}(React.Component));
exports.ModernViewGroupFieldButton = ModernViewGroupFieldButton;
//# sourceMappingURL=ModernViewGroupFieldButton.js.map