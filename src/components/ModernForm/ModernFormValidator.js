"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const __1 = require("../..");
class ModernFormValidator {
    constructor(strings) {
        this.strings = strings;
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
            const result = this.validateField(field, value);
            //if (result == "" && this.errorMessages) {
            //    this.errorMessages = this.errorMessages.filter(g => g.field != field.key);
            //}
            return result;
        };
        this.isEmptyString = (field, value) => {
            switch (field.type) {
                case __1.ModernFieldType.text:
                case __1.ModernFieldType.email:
                case __1.ModernFieldType.phone:
                case __1.ModernFieldType.login:
                    if (!value) {
                        return true;
                    }
                    return value.trim().length == 0;
                default:
                    return false;
            }
        };
        this.validateField = (field, value) => {
            if (field.required && (value == null || value.length == 0 || this.isEmptyString(field, value))) {
                return this.strings.formatString(this.strings.requiredField, field.name);
            }
            switch (field.type) {
                case __1.ModernFieldType.number:
                case __1.ModernFieldType.integer:
                    if (isNaN(value)) {
                        return this.strings.formatString(this.strings.numberNotValid, field.name);
                    }
                    //  if (value != null && field.NumberSteps != null && (value % field.NumberSteps)) {
                    //                  return this.strings.NumberNotValid.replace("{0}", field.DisplayName);
                    //  }
                    break;
                case __1.ModernFieldType.email:
                    if (value && value.length > 0 && !this.validateEmail(value)) {
                        return this.strings.formatString(this.strings.emailNotValid, field.name);
                    }
                    break;
                case __1.ModernFieldType.phone:
                    if (value && value.length > 0 && !this.validatePhone(value)) {
                        return this.strings.formatString(this.strings.phoneNotValid, field.name);
                    }
                    break;
                case __1.ModernFieldType.login:
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
            const re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
            return re.test(String(phone).toLowerCase());
        };
        this.validateLogin = (login) => {
            const re = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
            return re.test(String(login).toLowerCase());
        };
        this.validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
    }
    get isItemValid() {
        if (this.fields) {
            let errors = this.getErrorMap();
            console.log(errors);
            return errors.length == 0;
        }
        return false;
    }
}
__decorate([
    mobx_1.observable
], ModernFormValidator.prototype, "errorMessages", void 0);
__decorate([
    mobx_1.observable
], ModernFormValidator.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernFormValidator.prototype, "fields", void 0);
__decorate([
    mobx_1.computed
], ModernFormValidator.prototype, "isItemValid", null);
__decorate([
    mobx_1.action
], ModernFormValidator.prototype, "validateForm", void 0);
__decorate([
    mobx_1.action
], ModernFormValidator.prototype, "validateFormField", void 0);
exports.default = ModernFormValidator;
//# sourceMappingURL=ModernFormValidator.js.map