"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ModernState_1 = require("../../utilities/ModernState");
const ModernFormValidator_1 = require("./ModernFormValidator");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ModernFormState extends ModernState_1.default {
    constructor(item, fields, getNewOptionFieldsEvent, getNewOptionItemEvent, onNewOptionSaveEvent, language, validator) {
        super(language);
        this.getNewOptionFieldsEvent = getNewOptionFieldsEvent;
        this.getNewOptionItemEvent = getNewOptionItemEvent;
        this.onNewOptionSaveEvent = onNewOptionSaveEvent;
        this.onSaveNewOption = (item) => {
            return rxjs_1.from(this.onNewOptionSaveEvent(item)).pipe(operators_1.map((o) => {
                const field = this.validator.fields.find(v => v.key == this.newOptionFieldId);
                field.options = o;
                this.newOptionFieldId = null;
            })).toPromise();
        };
        this.onDismissNewOption = () => {
            this.newOptionFieldId = null;
        };
        this.onNewOption = (fieldId) => {
            this.newOptionFieldId = fieldId;
            rxjs_1.zip(rxjs_1.from(this.getNewOptionFieldsEvent(fieldId)), rxjs_1.from(this.getNewOptionItemEvent(fieldId))).pipe(operators_1.map(g => {
                console.log(g);
                this.newOptionFields = g[0];
                this.newOptionItem = g[1];
            })).subscribe();
        };
        this.onFieldChange = (key, value) => {
            this.validator.item[key] = value;
            console.log(this.validator.item);
        };
        if (validator) {
            this.validator = validator;
        }
        else {
            this.validator = new ModernFormValidator_1.default(this.strings);
        }
        this.validator.item = item;
        this.validator.fields = fields;
    }
    get item() {
        return this.validator.item;
    }
    get fields() {
        return this.validator.fields;
    }
    get errorMessages() {
        return this.validator.errorMessages;
    }
}
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
exports.default = ModernFormState;
//# sourceMappingURL=ModernFormState.js.map