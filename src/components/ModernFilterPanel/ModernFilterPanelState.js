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
class ModernFilterPanelState extends ModernState_1.default {
    constructor(field, currentFilters, onApplyEvent, onDismissEvent, getFilterOptionsEvent, language) {
        super(language);
        this.onApplyEvent = onApplyEvent;
        this.onDismissEvent = onDismissEvent;
        this.getFilterOptionsEvent = getFilterOptionsEvent;
        this.onDismiss = () => {
            this.options = null;
            this.onDismissEvent();
        };
        this.getOptions = () => {
            if (this.field) {
                rxjs_1.from(this.getFilterOptionsEvent(this.field.key)).pipe(operators_1.map((p) => {
                    this.options = p.map(v => {
                        v.isChecked = this.currentFilters && this.currentFilters.findIndex(c => c == v.id) > -1;
                        return v;
                    });
                })).subscribe();
            }
        };
        this.update = (value, isChecked) => {
            var current = this.options.find(v => v.id == value);
            current.isChecked = isChecked;
        };
        this.onFooterButtonClick = (key) => {
            switch (key) {
                case "Apply":
                    rxjs_1.from(this.onApplyEvent(this.field.key, mobx_1.toJS(this.options.filter(g => g.isChecked).map(g => g.id)))).subscribe();
                    break;
                case "Clear":
                    this.options = this.options.map(v => {
                        v.isChecked = false;
                        return v;
                    });
                    break;
            }
        };
        this.field = field;
        this.currentFilters = currentFilters;
    }
    get panelTitle() {
        if (this.field) {
            if (this.checkedValueCount > 0) {
                return `${this.strings.filterBy} ${this.field.name} (${this.checkedValueCount})`;
            }
            return `${this.strings.filterBy} ${this.field.name}`;
        }
        return this.strings.filterBy;
    }
    get isLoaded() {
        return this.options != null;
    }
    get checkedValueCount() {
        if (this.options) {
            return this.options.filter(f => f.isChecked).length;
        }
        return 0;
    }
    get footerButtons() {
        if (!this.isLoaded) {
            return [];
        }
        return [
            {
                text: this.strings.apply, id: "Apply", isPrimary: true
            },
            {
                text: this.strings.clearAll, id: "Clear"
            }
        ];
    }
}
__decorate([
    mobx_1.observable
], ModernFilterPanelState.prototype, "currentFilters", void 0);
__decorate([
    mobx_1.observable
], ModernFilterPanelState.prototype, "options", void 0);
__decorate([
    mobx_1.observable
], ModernFilterPanelState.prototype, "field", void 0);
__decorate([
    mobx_1.computed
], ModernFilterPanelState.prototype, "panelTitle", null);
__decorate([
    mobx_1.computed
], ModernFilterPanelState.prototype, "isLoaded", null);
__decorate([
    mobx_1.computed
], ModernFilterPanelState.prototype, "checkedValueCount", null);
__decorate([
    mobx_1.computed
], ModernFilterPanelState.prototype, "footerButtons", null);
__decorate([
    mobx_1.action
], ModernFilterPanelState.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernFilterPanelState.prototype, "getOptions", void 0);
__decorate([
    mobx_1.action
], ModernFilterPanelState.prototype, "update", void 0);
__decorate([
    mobx_1.action
], ModernFilterPanelState.prototype, "onFooterButtonClick", void 0);
exports.default = ModernFilterPanelState;
//# sourceMappingURL=ModernFilterPanelState.js.map