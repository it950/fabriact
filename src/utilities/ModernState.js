"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const locales_1 = require("./locales");
class ModernState {
    constructor(language) {
        this.locale = new locales_1.default(language);
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
], ModernState.prototype, "locale", void 0);
__decorate([
    mobx_1.computed
], ModernState.prototype, "strings", null);
exports.default = ModernState;
//# sourceMappingURL=ModernState.js.map