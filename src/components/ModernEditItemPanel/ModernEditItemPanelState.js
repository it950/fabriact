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
const ModernState_1 = require("../../utilities/ModernState");
const ModernFormValidator_1 = require("../ModernForm/ModernFormValidator");
class ModernEditItemPanelState extends ModernState_1.default {
    constructor(item, fields, onDismissEvent, onUpdateItem, language) {
        super(language);
        this.onDismissEvent = onDismissEvent;
        this.onUpdateItem = onUpdateItem;
        this.onDismiss = () => {
            this.item = null;
            this.onDismissEvent();
        };
        this.onFooterButtonClick = (key) => {
            switch (key) {
                case "Save":
                    if (this.validator.validateForm()) {
                        console.log(mobx_1.toJS(this.item));
                        this.isSaving = true;
                        rxjs_1.from(this.onUpdateItem(mobx_1.toJS(this.item)))
                            .pipe(operators_1.map(y => {
                            this.isSaving = false;
                            this.item = null;
                            this.validator = new ModernFormValidator_1.default(this.strings);
                        })).subscribe();
                    }
                    break;
                case "Cancel":
                    this.onDismiss();
                    break;
            }
        };
        this.item = item;
        this.fields = fields;
        this.validator = new ModernFormValidator_1.default(this.strings);
    }
    get footerButtons() {
        if (!this.item || this.isSaving || !this.fields) {
            return [];
        }
        var items = [
            {
                text: this.strings.save,
                id: "Save",
                isPrimary: true
            },
            {
                text: this.strings.cancel,
                id: "Cancel"
            }
        ];
        return items;
    }
}
__decorate([
    mobx_1.observable
], ModernEditItemPanelState.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernEditItemPanelState.prototype, "actions", void 0);
__decorate([
    mobx_1.observable
], ModernEditItemPanelState.prototype, "isSaving", void 0);
__decorate([
    mobx_1.observable
], ModernEditItemPanelState.prototype, "fields", void 0);
__decorate([
    mobx_1.computed
], ModernEditItemPanelState.prototype, "footerButtons", null);
__decorate([
    mobx_1.action
], ModernEditItemPanelState.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernEditItemPanelState.prototype, "onFooterButtonClick", void 0);
exports.default = ModernEditItemPanelState;
//# sourceMappingURL=ModernEditItemPanelState.js.map