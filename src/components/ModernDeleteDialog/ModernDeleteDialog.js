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
const Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
const Buttons_1 = require("../Buttons");
const locales_1 = require("../../utilities/locales");
let ModernDeleteDialog = class ModernDeleteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.locale = new locales_1.default(props.language);
    }
    render() {
        const options = {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
        };
        const props = {
            type: Dialog_1.DialogType.normal,
            title: this.locale.strings.formatString(this.locale.strings.confirmDeleteTitle, this.props.itemCount),
            subText: this.locale.strings.formatString(this.locale.strings.confirmDeleteText, this.props.itemCount)
        };
        return (React.createElement(Dialog_1.Dialog, { hidden: !this.props.isVisible, onDismiss: this.props.onCanceled, dialogContentProps: props, modalProps: options },
            React.createElement(Dialog_1.DialogFooter, null,
                React.createElement(Buttons_1.ModernPrimaryButton, { onClick: this.props.onConfirmed, id: "Delete", label: this.locale.strings.yes }),
                React.createElement(Buttons_1.ModernButton, { onClick: this.props.onCanceled, id: "Cancel", label: this.locale.strings.no }))));
    }
};
ModernDeleteDialog = __decorate([
    mobx_react_1.observer
], ModernDeleteDialog);
exports.ModernDeleteDialog = ModernDeleteDialog;
//# sourceMappingURL=ModernDeleteDialog.js.map