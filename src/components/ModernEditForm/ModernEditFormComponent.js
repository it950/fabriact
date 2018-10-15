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
const ModernEditField_1 = require("../ModernEditField");
const mobx_1 = require("mobx");
const ModernEditFormConfig_1 = require("./ModernEditFormConfig");
//@inject('config')
let ModernEditFormComponent = class ModernEditFormComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log("hoe vaak kom ik hier");
        this.config = new ModernEditFormConfig_1.default(this.props.item, this.props.fields, this.props.onValidated, this.props.language);
        mobx_1.reaction(() => this.props.forceValidation, (forceValidation) => {
            if (forceValidation) {
                this.config.validateForm();
            }
        });
        mobx_1.reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }
    //render() {
    //    console.log("whatdtheufck");
    //    console.log(this.props.errorMessages);
    //    const fields = this.props.fields ? this.props.fields.map(t => {
    //        const value = this.props.item && this.props.item[t.key] ? this.props.item[t.key] : null;
    //        const errorMessage = this.props.errorMessages && this.props.errorMessages.find(i => i.field == t.key) != null ?
    //            this.props.errorMessages.find(i => i.field == t.key).error : null;
    //        return <ModernEditField field={t} value={value} key={t.key} onChange={this.props.onFieldChange} errorMessage={errorMessage}
    //            validate={this.props.validateFormField} />;
    //    }) : <span></span>;
    //    return (
    //        <span>
    //            <form>
    //                {fields}
    //            </form>
    //        </span>
    //    );
    //}
    render() {
        console.log("whatdtheufck");
        console.log(this.config.errorMessages);
        const fields = this.config.fields ? this.config.fields.map(t => {
            const value = this.config.item && this.config.item[t.key] ? this.config.item[t.key] : null;
            const errorMessage = this.config.errorMessages && this.config.errorMessages.find(i => i.field == t.key) != null ?
                this.config.errorMessages.find(i => i.field == t.key).error : null;
            return React.createElement(ModernEditField_1.ModernEditField, { field: t, value: value, key: t.key, onChange: this.config.onFieldChange, errorMessage: errorMessage, validate: this.config.validateFormField });
        }) : React.createElement("span", null);
        return (React.createElement("span", null,
            React.createElement("form", null, fields)));
    }
};
ModernEditFormComponent = __decorate([
    mobx_react_1.observer
], ModernEditFormComponent);
exports.ModernEditFormComponent = ModernEditFormComponent;
//# sourceMappingURL=ModernEditFormComponent.js.map