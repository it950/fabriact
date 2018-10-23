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
var mobx_1 = require("mobx");
var ModernState_1 = require("../../utilities/ModernState");
var ModernFormValidator_1 = require("./ModernFormValidator");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModernFormState = /** @class */ (function (_super) {
    __extends(ModernFormState, _super);
    function ModernFormState(item, fields, getNewOptionFieldsEvent, getNewOptionItemEvent, onNewOptionSaveEvent, language, validator) {
        var _this = _super.call(this, language) || this;
        _this.getNewOptionFieldsEvent = getNewOptionFieldsEvent;
        _this.getNewOptionItemEvent = getNewOptionItemEvent;
        _this.onNewOptionSaveEvent = onNewOptionSaveEvent;
        _this.onSaveNewOption = function (item) {
            return rxjs_1.from(_this.onNewOptionSaveEvent(item)).pipe(operators_1.map(function (o) {
                var field = _this.validator.fields.find(function (v) { return v.key == _this.newOptionFieldId; });
                field.options = o;
                _this.newOptionFieldId = null;
            })).toPromise();
        };
        _this.onDismissNewOption = function () {
            _this.newOptionFieldId = null;
        };
        _this.onNewOption = function (fieldId) {
            _this.newOptionFieldId = fieldId;
            rxjs_1.zip(rxjs_1.from(_this.getNewOptionFieldsEvent(fieldId)), rxjs_1.from(_this.getNewOptionItemEvent(fieldId))).pipe(operators_1.map(function (g) {
                console.log(g);
                _this.newOptionFields = g[0];
                _this.newOptionItem = g[1];
            })).subscribe();
        };
        _this.onFieldChange = function (key, value) {
            _this.validator.item[key] = value;
            console.log(_this.validator.item);
        };
        if (validator) {
            _this.validator = validator;
        }
        else {
            _this.validator = new ModernFormValidator_1.default(_this.strings);
        }
        _this.validator.item = item;
        _this.validator.fields = fields;
        return _this;
    }
    Object.defineProperty(ModernFormState.prototype, "item", {
        get: function () {
            return this.validator.item;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernFormState.prototype, "fields", {
        get: function () {
            return this.validator.fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernFormState.prototype, "errorMessages", {
        get: function () {
            return this.validator.errorMessages;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernFormState.prototype, "newOptionFieldId", void 0);
    __decorate([
        mobx_1.observable
    ], ModernFormState.prototype, "title", void 0);
    __decorate([
        mobx_1.observable
    ], ModernFormState.prototype, "itemSaving", void 0);
    __decorate([
        mobx_1.observable
    ], ModernFormState.prototype, "newOptionFields", void 0);
    __decorate([
        mobx_1.observable
    ], ModernFormState.prototype, "newOptionItem", void 0);
    __decorate([
        mobx_1.computed
    ], ModernFormState.prototype, "item", null);
    __decorate([
        mobx_1.computed
    ], ModernFormState.prototype, "fields", null);
    __decorate([
        mobx_1.computed
    ], ModernFormState.prototype, "errorMessages", null);
    __decorate([
        mobx_1.action
    ], ModernFormState.prototype, "onSaveNewOption", void 0);
    __decorate([
        mobx_1.action
    ], ModernFormState.prototype, "onDismissNewOption", void 0);
    __decorate([
        mobx_1.action
    ], ModernFormState.prototype, "onNewOption", void 0);
    __decorate([
        mobx_1.action
    ], ModernFormState.prototype, "onFieldChange", void 0);
    return ModernFormState;
}(ModernState_1.default));
exports.default = ModernFormState;
//# sourceMappingURL=ModernFormState.js.map