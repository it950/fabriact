"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const Modern_Types_1 = require("../../Modern.Types");
const locales_1 = require("../../utilities/locales");
class ModernEditFormConfig {
    constructor(item, fields, onValidated, language = null) {
        this.onValidated = onValidated;
        this.step = 0;
        this.onFieldChange = (key, value) => {
            //if (!this.item) {
            //    this.item = {};
            //}
            this.item[key] = value;
        };
        this.getErrorMap = () => {
            return this.fields.map(f => {
                return {
                    field: f.key,
                    error: this.validateField(f, this.item[f.key])
                };
            }).filter(t => t.error != "");
        };
        this.validateForm = () => {
            this.errorMessages = this.getErrorMap();
            return this.errorMessages.length == 0;
        };
        this.validateFormField = (field, value) => {
            var result = this.validateField(field, value);
            if (result == "" && this.errorMessages) {
                this.errorMessages = this.errorMessages.filter(g => g.field != field.key);
            }
            this.onValidated(this.isItemValid);
            return result;
        };
        this.validateField = (field, value) => {
            if (field.required && (value == null || value.length == 0)) {
                return this.strings.formatString(this.strings.requiredField, field.name);
            }
            switch (field.type) {
                case Modern_Types_1.ModernFieldType.number:
                case Modern_Types_1.ModernFieldType.integer:
                    if (isNaN(value)) {
                        return this.strings.formatString(this.strings.numberNotValid, field.name);
                    }
                    //  if (value != null && field.NumberSteps != null && (value % field.NumberSteps)) {
                    //                  return this.strings.NumberNotValid.replace("{0}", field.DisplayName);
                    //  }
                    break;
                case Modern_Types_1.ModernFieldType.email:
                    if (value && value.length > 0 && !this.validateEmail(value)) {
                        return this.strings.formatString(this.strings.emailNotValid, field.name);
                    }
                    break;
                case Modern_Types_1.ModernFieldType.phone:
                    if (value && value.length > 0 && !this.validatePhone(value)) {
                        return this.strings.formatString(this.strings.phoneNotValid, field.name);
                    }
                    break;
                case Modern_Types_1.ModernFieldType.login:
                    if (value && value.length > 0 && !this.validateLogin(value)) {
                        return this.strings.formatString(this.strings.loginNotValid, field.name);
                    }
                    break;
                default:
                    break;
            }
            return "";
        };
        this.validatePhone = (phone) => {
            var re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
            return re.test(String(phone).toLowerCase());
        };
        this.validateLogin = (login) => {
            //var re = /^[a-zA-Z\-]+$/;
            var re = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
            return re.test(String(login).toLowerCase());
        };
        this.validateEmail = (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        this.locale = new locales_1.default(language);
        this.item = item;
        this.fields = fields;
    }
    get isItemValid() {
        if (this.fields) {
            let errors = this.getErrorMap();
            console.log(errors);
            return errors.length == 0;
        }
        return false;
    }
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }
        return {};
    }
}
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "title", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "itemSaving", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "errorMessages", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "step", void 0);
__decorate([
    mobx_1.observable
], ModernEditFormConfig.prototype, "fields", void 0);
__decorate([
    mobx_1.action
], ModernEditFormConfig.prototype, "onFieldChange", void 0);
__decorate([
    mobx_1.computed
], ModernEditFormConfig.prototype, "isItemValid", null);
__decorate([
    mobx_1.computed
], ModernEditFormConfig.prototype, "strings", null);
__decorate([
    mobx_1.action
], ModernEditFormConfig.prototype, "validateForm", void 0);
__decorate([
    mobx_1.action
], ModernEditFormConfig.prototype, "validateFormField", void 0);
exports.default = ModernEditFormConfig;
//# sourceMappingURL=ModernEditFormConfig.js.map