"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var locales_1 = require("./locales");
var ModernState = /** @class */ (function () {
    function ModernState(language) {
        this.locale = new locales_1.default(language);
    }
    Object.defineProperty(ModernState.prototype, "strings", {
        get: function () {
            if (this.locale) {
                return this.locale.strings;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernState.prototype, "locale", void 0);
    __decorate([
        mobx_1.computed
    ], ModernState.prototype, "strings", null);
    return ModernState;
}());
exports.default = ModernState;
//# sourceMappingURL=ModernState.js.map