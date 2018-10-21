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
const Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
const __1 = require("..");
let ModernChoiceEditField = class ModernChoiceEditField extends React.Component {
    constructor(props) {
        super(props);
        //private updateItem = (value) => {
        //    var result = null;
        //    console.log(value);
        //    if (!this.props.field.multiSelect) {
        //        result = value.key;
        //    }
        //    else {
        //        result = this.props.value;
        //        if (value.selected) {
        //            if (this.props.value) {
        //                result.push(value.key);
        //            }
        //            else {
        //                result = [value.key];
        //            }
        //        }
        //        else {
        //            result.splice(result.indexOf(value.key), 1);
        //        }
        //    }
        //    console.log("UPDATE WITH");
        //    console.log(result);
        //    this.props.onChange(this.props.field.key, result);
        //}
        this.updateItem = (value) => {
            console.log(value);
            if (this.props.field.multiSelect) {
                if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.key).length > 0) {
                    //this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key).map(v => {
                    //    return { title: v.text, id: v.key };
                    //}));
                    this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key));
                }
                else {
                    var results = this.props.value ? this.props.value : [];
                    results.push({ title: value.text, id: value.key });
                    //this.props.onChange(this.props.field.key, results.map(v => {
                    //    return { title: v.text, id: v.key };
                    //}));
                    this.props.onChange(this.props.field.key, results);
                }
            }
            else {
                if (this.props.value && this.props.value.id == value.key) {
                    this.props.onChange(this.props.field.key, null);
                }
                else {
                    //  var newValue = this.props.values.push(value);
                    this.props.onChange(this.props.field.key, { title: value.text, id: value.key });
                }
            }
            //this.props.updateItem(this.props.fieldName, { id: value.id, title: value.title });
            //    return value;
        };
        this.updateItem3 = (value) => {
            // this.props.onChange(this.props.field.key, value);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
        this.modernLookupFieldToDropdownOptionMapping = (modernLookupField) => {
            var persona = {
                //  title: modernLookupField.title,
                key: modernLookupField.id,
                //  imageUrl: modernLookupField.image,
                // secondaryText: modernLookupField.secondaryText,
                text: modernLookupField.title,
            };
            return persona;
        };
    }
    render() {
        console.log(this.props);
        const options = this.props.field.options.map(c => this.modernLookupFieldToDropdownOptionMapping(c));
        //defaultSelectedKeys={toJS(this.props.value)}
        // defaultSelectedKey={this.props.value}
        let field = React.createElement("span", null);
        if (this.props.field.multiSelect) {
            const keys = this.props.value ? this.props.value.map(i => i.id) : [];
            field = React.createElement(Dropdown_1.Dropdown, { multiSelect: true, onChanged: this.updateItem, options: options, defaultSelectedKeys: keys });
        }
        else {
            const key = this.props.value ? this.props.value.id : null;
            field = React.createElement(Dropdown_1.Dropdown, { onChanged: this.updateItem, options: options, defaultSelectedKey: key });
        }
        //        this.props.value ? this.props.value.map(i => i.id)
        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            field));
    }
};
ModernChoiceEditField = __decorate([
    mobx_react_1.observer
], ModernChoiceEditField);
exports.ModernChoiceEditField = ModernChoiceEditField;
//# sourceMappingURL=ModernChoiceEditField.js.map