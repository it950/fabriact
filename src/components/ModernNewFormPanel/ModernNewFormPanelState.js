"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const locales_1 = require("../../utilities/locales");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ModernNewFormPanelState {
    constructor(item, groups, onSaveNewItem, onDismissEvent, title = null, language = null) {
        this.onSaveNewItem = onSaveNewItem;
        this.onDismissEvent = onDismissEvent;
        this.step = 0;
        this.onFieldChange = (key, value) => {
            this.item[key] = value;
        };
        this.onValidated = (isValid) => {
            this.isValid = isValid;
        };
        this.onDismiss = () => {
            this.item = null;
            this.step = 0;
            this.onDismissEvent();
        };
        this.onFooterButtonClick = (key) => {
            console.log(mobx_1.toJS(this.item));
            switch (key) {
                case "Back":
                    this.step--;
                    break;
                case "Next":
                    this.forceValidation = true;
                    if (this.isValid) {
                        this.step++;
                    }
                    break;
                case "Finish":
                    this.forceValidation = true;
                    if (this.isValid) {
                        console.log(this.item);
                        this.isSaving = true;
                        rxjs_1.from(this.onSaveNewItem(mobx_1.toJS(this.item)))
                            .pipe(operators_1.map(y => {
                            this.isSaving = false;
                            this.step = 0;
                            this.item = null;
                        })).subscribe();
                    }
                    break;
            }
        };
        this.locale = new locales_1.default(language);
        this.item = item;
        this.groups = groups;
        this.title = title;
    }
    get panelTitle() {
        if (this.title) {
            return this.title;
        }
        return this.strings.newItem;
    }
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.step].fields;
        }
        return null;
    }
    get isLoaded() {
        return this.fields != null && this.item != null;
    }
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }
        return {};
    }
    get footerButtons() {
        if (!this.item || this.isSaving || !this.groups) {
            return [];
        }
        var items = [];
        if (this.step > 0) {
            items.push({ text: this.strings.previous, id: "Back" });
        }
        if (this.groups.length - 1 > this.step) {
            items.push({ text: this.strings.next, id: "Next" });
        }
        items.push({ text: this.strings.finish, id: "Finish", isPrimary: true });
        return items;
    }
}
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "title", void 0);
__decorate([
    mobx_1.computed
], ModernNewFormPanelState.prototype, "panelTitle", null);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "isSaving", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "isValid", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "step", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "groups", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelState.prototype, "forceValidation", void 0);
__decorate([
    mobx_1.computed
], ModernNewFormPanelState.prototype, "fields", null);
__decorate([
    mobx_1.computed
], ModernNewFormPanelState.prototype, "isLoaded", null);
__decorate([
    mobx_1.action
], ModernNewFormPanelState.prototype, "onFieldChange", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelState.prototype, "onValidated", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelState.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelState.prototype, "onFooterButtonClick", void 0);
__decorate([
    mobx_1.computed
], ModernNewFormPanelState.prototype, "strings", null);
__decorate([
    mobx_1.computed
], ModernNewFormPanelState.prototype, "footerButtons", null);
exports.default = ModernNewFormPanelState;
//# sourceMappingURL=ModernNewFormPanelState.js.map