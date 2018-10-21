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
const ModernFieldLabel_1 = require("../ModernFieldLabel/ModernFieldLabel");
const ModernMetadataButton_1 = require("./ModernMetadataButton");
const __1 = require("../../..");
const locales_1 = require("../../../utilities/locales");
let ModernMetadataEditField = class ModernMetadataEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            if (this.props.field.multiSelect) {
                if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.id).length > 0) {
                    this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.id).map(v => {
                        return { title: v.title, id: v.id };
                    }));
                }
                else {
                    var results = this.props.value ? this.props.value : [];
                    var newValue = results.push(value);
                    this.props.onChange(this.props.field.key, results.map(v => {
                        return { title: v.title, id: v.id };
                    }));
                }
            }
            else {
                if (this.props.value && this.props.value.id == value.id) {
                    this.props.onChange(this.props.field.key, null);
                }
                else {
                    this.props.onChange(this.props.field.key, { title: value.title, id: value.id });
                }
            }
        };
        this.addNewOption = () => {
            console.log("dasdsa");
            this.props.onNewOption(this.props.field.key);
        };
        this.locale = new locales_1.default(this.props.language);
    }
    render() {
        var buttons = this.props.field.options.map(option => {
            var checked = (this.props.field.multiSelect && this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == option.id).length > 0)
                || (!this.props.field.multiSelect && this.props.value && this.props.value.id == option.id);
            return React.createElement(ModernMetadataButton_1.ModernMetadataButtonField, { key: option.id, id: option.id, checked: checked, label: option.title, onClicked: this.updateItem });
        });
        console.log("dasdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(this.props);
        if (this.props.field.newOptionItems) {
            buttons.push(React.createElement(__1.ModernPrimaryButton, { id: "Add", key: "Add", label: this.locale.strings.add, onClick: this.addNewOption }));
        }
        return (React.createElement("span", null,
            React.createElement(ModernFieldLabel_1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            buttons));
    }
};
ModernMetadataEditField = __decorate([
    mobx_react_1.observer
], ModernMetadataEditField);
exports.ModernMetadataEditField = ModernMetadataEditField;
//# sourceMappingURL=ModernMetadataEditField.js.map