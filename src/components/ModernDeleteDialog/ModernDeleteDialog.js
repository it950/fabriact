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
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Buttons_1 = require("../Buttons");
var locales_1 = require("../../utilities/locales");
var ModernDeleteDialog = /** @class */ (function (_super) {
    __extends(ModernDeleteDialog, _super);
    function ModernDeleteDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.locale = new locales_1.default(props.language);
        return _this;
    }
    ModernDeleteDialog.prototype.render = function () {
        var options = {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
        };
        var props = {
            type: Dialog_1.DialogType.normal,
            title: this.locale.strings.formatString(this.locale.strings.confirmDeleteTitle, this.props.itemCount),
            subText: this.locale.strings.formatString(this.locale.strings.confirmDeleteText, this.props.itemCount)
        };
        return (React.createElement(Dialog_1.Dialog, { hidden: !this.props.isVisible, onDismiss: this.props.onCanceled, dialogContentProps: props, modalProps: options },
            React.createElement(Dialog_1.DialogFooter, null,
                React.createElement(Buttons_1.ModernPrimaryButton, { onClick: this.props.onConfirmed, id: "Delete", label: this.locale.strings.yes }),
                React.createElement(Buttons_1.ModernButton, { onClick: this.props.onCanceled, id: "Cancel", label: this.locale.strings.no }))));
    };
    ModernDeleteDialog = __decorate([
        mobx_react_1.observer
    ], ModernDeleteDialog);
    return ModernDeleteDialog;
}(React.Component));
exports.ModernDeleteDialog = ModernDeleteDialog;
//# sourceMappingURL=ModernDeleteDialog.js.map