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
const ModernEditFieldLabel_1 = require("../ModernEditFieldLabel/ModernEditFieldLabel");
const ModernMetadataButton_1 = require("./ModernMetadataButton");
let ModernMetadataEditField = class ModernMetadataEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (value) => {
            console.log(value);
            if (this.props.field.isArray) {
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
                    //  var newValue = this.props.values.push(value);
                    this.props.onChange(this.props.field.key, { title: value.title, id: value.id });
                }
            }
            //this.props.updateItem(this.props.fieldName, { id: value.id, title: value.title });
            //    return value;
        };
        this.updateItem2 = (value) => {
            // this.props.onChange(this.props.field.key, value);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
    }
    render() {
        console.log(this.props);
        var buttons = this.props.field.options.map(option => {
            var checked = (this.props.field.isArray && this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == option.id).length > 0)
                || (!this.props.field.isArray && this.props.value && this.props.value.id == option.id);
            return React.createElement(ModernMetadataButton_1.ModernMetadataButtonField, { key: option.id, id: option.id, checked: checked, label: option.title, onClicked: this.updateItem });
        });
        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (React.createElement("span", null,
            React.createElement(ModernEditFieldLabel_1.ModernEditFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            buttons));
    }
};
ModernMetadataEditField = __decorate([
    mobx_react_1.observer
], ModernMetadataEditField);
exports.ModernMetadataEditField = ModernMetadataEditField;
//# sourceMappingURL=ModernMetadataEditField.js.map