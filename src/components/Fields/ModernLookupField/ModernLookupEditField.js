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
const Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const __1 = require("..");
let ModernLookupEditField = class ModernLookupEditField extends React.Component {
    constructor(props) {
        super(props);
        this.updateItem = (items) => {
            if (this.props.field.multiSelect) {
                this.props.onChange(this.props.field.key, items.map(t => {
                    return {
                        id: t.id, title: t.title
                    };
                }));
            }
            else {
                if (items.length > 0) {
                    this.props.onChange(this.props.field.key, { id: items[0].id, title: items[0].title });
                }
                else {
                    this.props.onChange(this.props.field.key, null);
                }
            }
            // this.props.validate(this.props.field, items);
        };
        //private updateItem = (value) => {
        //    this.props.onChange(this.props.field.key, value);
        //    return value;
        //}
        this.getErrorMessage = (value) => {
            this.props.validate(this.props.field, value);
        };
        this.modernLookupFieldToPersonaMapping = (modernLookupField) => {
            var persona = {
                title: modernLookupField.title,
                id: modernLookupField.id,
                imageUrl: modernLookupField.image,
                secondaryText: modernLookupField.secondaryText,
                text: modernLookupField.title,
            };
            return persona;
        };
        this._onFocus = (items) => {
            //  console.log(toJS(this.props.value));
            // console.log(items);
            ///  console.log(this.props.resolveSuggestions);
            if (this.props.resolveSuggestions) {
                return rxjs_1.from(this.props.resolveSuggestions()).pipe(operators_1.map(t => {
                    console.log(t);
                    return t.filter(v => this.props.value == null || this.props.value.find(k => k.id == v.id) == null).map(v => {
                        return this.modernLookupFieldToPersonaMapping(v);
                        //var description = v.PsaPrimaryDescription ? v.PsaPrimaryDescription : v.PsaDescription;
                        //return {
                        //    title: v.PsaTitle,
                        //    id: v.PsaId,
                        //    imageUrl: v.PsaImage,
                        //    secondaryText: description,
                        //    showSecondaryText: description != null,
                        //    text: v.PsaTitle
                        //};
                    });
                })).toPromise();
            }
            else {
                return [];
            }
        };
        this._validateInput = (input) => {
            if (input.indexOf('@') !== -1) {
                return Pickers_1.ValidationState.valid;
            }
            else if (input.length > 1) {
                return Pickers_1.ValidationState.warning;
            }
            else {
                return Pickers_1.ValidationState.invalid;
            }
        };
        this._onFilterChanged = (filterText, currentPersonas, limitResults) => {
            console.log("_onFilterChanged");
            console.log(filterText);
            if (filterText) {
                return rxjs_1.from(this.props.resolveLookup(filterText)).pipe(operators_1.map(t => {
                    console.log(t);
                    return t.filter(v => this.props.value == null || this.props.value.find(k => k.id == v.id) == null).map(v => {
                        return this.modernLookupFieldToPersonaMapping(v);
                    });
                })).toPromise();
            }
            else {
                return [];
            }
        };
    }
    render() {
        const itemLimit = this.props.field.multiSelect ? 100 : 1;
        let values = this.props.field.multiSelect ? (this.props.value != null && this.props.value.length > 0) ? this.props.value.map(v => {
            return this.modernLookupFieldToPersonaMapping(v);
        }) : [] : this.props.value != null ? [this.modernLookupFieldToPersonaMapping(this.props.value)] : [];
        // className={errorClass}
        var picker = React.createElement(Pickers_1.NormalPeoplePicker, { defaultSelectedItems: values, onValidateInput: this._validateInput, onEmptyInputFocus: this._onFocus, itemLimit: itemLimit, resolveDelay: 500, onResolveSuggestions: this._onFilterChanged, onChange: this.updateItem });
        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            picker));
    }
};
ModernLookupEditField = __decorate([
    mobx_react_1.observer
], ModernLookupEditField);
exports.ModernLookupEditField = ModernLookupEditField;
//# sourceMappingURL=ModernLookupEditField.js.map