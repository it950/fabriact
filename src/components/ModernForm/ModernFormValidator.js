"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var __1 = require("../..");
var ModernFormValidator = /** @class */ (function () {
    function ModernFormValidator(strings) {
        var _this = this;
        this.strings = strings;
        this.getErrorMap = function () {
            return _this.fields.map(function (f) {
                return {
                    field: f.key,
                    error: _this.validateField(f, _this.item[f.key])
                };
            }).filter(function (t) { return t.error != ""; });
        };
        this.validateForm = function () {
            _this.errorMessages = _this.getErrorMap();
            return _this.errorMessages.length == 0;
        };
        this.validateFormField = function (field, value) {
            var result = _this.validateField(field, value);
            //if (result == "" && this.errorMessages) {
            //    this.errorMessages = this.errorMessages.filter(g => g.field != field.key);
            //}
            return result;
        };
        this.isEmptyString = function (field, value) {
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
        this.validateField = function (field, value) {
            if (field.required && (value == null || value.length == 0 || _this.isEmptyString(field, value))) {
                return _this.strings.formatString(_this.strings.requiredField, field.name);
            }
            switch (field.type) {
                case __1.ModernFieldType.number:
                case __1.ModernFieldType.integer:
                    if (isNaN(value)) {
                        return _this.strings.formatString(_this.strings.numberNotValid, field.name);
                    }
                    //  if (value != null && field.NumberSteps != null && (value % field.NumberSteps)) {
                    //                  return this.strings.NumberNotValid.replace("{0}", field.DisplayName);
                    //  }
                    break;
                case __1.ModernFieldType.email:
                    if (value && value.length > 0 && !_this.validateEmail(value)) {
                        return _this.strings.formatString(_this.strings.emailNotValid, field.name);
                    }
                    break;
                case __1.ModernFieldType.phone:
                    if (value && value.length > 0 && !_this.validatePhone(value)) {
                        return _this.strings.formatString(_this.strings.phoneNotValid, field.name);
                    }
                    break;
                case __1.ModernFieldType.login:
                    if (value && value.length > 0 && !_this.validateLogin(value)) {
                        return _this.strings.formatString(_this.strings.loginNotValid, field.name);
                    }
                    break;
                default:
                    break;
            }
            return "";
        };
        this.validatePhone = function (phone) {
            var re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
            return re.test(String(phone).toLowerCase());
        };
        this.validateLogin = function (login) {
            var re = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
            return re.test(String(login).toLowerCase());
        };
        this.validateEmail = function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
    }
    Object.defineProperty(ModernFormValidator.prototype, "isItemValid", {
        get: function () {
            if (this.fields) {
                var errors = this.getErrorMap();
                console.log(errors);
                return errors.length == 0;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
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
    return ModernFormValidator;
}());
exports.default = ModernFormValidator;
//# sourceMappingURL=ModernFormValidator.js.map