"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ModernFormValidator_1 = require("../ModernForm/ModernFormValidator");
const ModernState_1 = require("../../utilities/ModernState");
class ModernNewItemPanelState extends ModernState_1.default {
    constructor(item, groups, onSaveNewItem, onDismissEvent, title, language) {
        super(language);
        this.onSaveNewItem = onSaveNewItem;
        this.onDismissEvent = onDismissEvent;
        this.step = 0;
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
                    if (this.validator.validateForm()) {
                        this.step++;
                    }
                    break;
                case "Finish":
                    if (this.validator.validateForm()) {
                        this.isSaving = true;
                        rxjs_1.from(this.onSaveNewItem(mobx_1.toJS(this.item)))
                            .pipe(operators_1.map(y => {
                            this.isSaving = false;
                            this.step = 0;
                            this.item = null;
                            this.validator = new ModernFormValidator_1.default(this.strings);
                        })).subscribe();
                    }
                    break;
            }
        };
        this.item = item;
        this.groups = groups;
        this.title = title;
        this.validator = new ModernFormValidator_1.default(this.strings);
    }
    get panelTitle() {
        if (this.title) {
            return this.title;
        }
        return this.strings.newItem;
    }
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.step].fields.filter(a => !a.readOnly);
        }
        return null;
    }
    get isLoaded() {
        return this.fields != null && this.item != null;
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
], ModernNewItemPanelState.prototype, "title", void 0);
__decorate([
    mobx_1.observable
], ModernNewItemPanelState.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernNewItemPanelState.prototype, "isSaving", void 0);
__decorate([
    mobx_1.observable
], ModernNewItemPanelState.prototype, "step", void 0);
__decorate([
    mobx_1.observable
], ModernNewItemPanelState.prototype, "groups", void 0);
__decorate([
    mobx_1.computed
], ModernNewItemPanelState.prototype, "panelTitle", null);
__decorate([
    mobx_1.computed
], ModernNewItemPanelState.prototype, "fields", null);
__decorate([
    mobx_1.computed
], ModernNewItemPanelState.prototype, "isLoaded", null);
__decorate([
    mobx_1.computed
], ModernNewItemPanelState.prototype, "footerButtons", null);
__decorate([
    mobx_1.action
], ModernNewItemPanelState.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernNewItemPanelState.prototype, "onFooterButtonClick", void 0);
exports.default = ModernNewItemPanelState;
//# sourceMappingURL=ModernNewItemPanelState.js.map