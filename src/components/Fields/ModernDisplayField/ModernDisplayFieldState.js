"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModernDisplayFieldState = /** @class */ (function () {
    function ModernDisplayFieldState(item, field, onGetFieldValueEvent) {
        var _this = this;
        this.onGetFieldValueEvent = onGetFieldValueEvent;
        this.init = function () {
            return rxjs_1.from(_this.onGetFieldValueEvent(_this.field.key, mobx_1.toJS(_this.item))).pipe(operators_1.map(function (g) {
                _this.value = g;
                _this.isLoading = false;
            })).toPromise();
        };
        this.field = field;
        this.item = item;
        if (!field.asyncValue) {
            this.value = this.item[this.field.key];
        }
        else {
            this.isLoading = true;
        }
    }
    Object.defineProperty(ModernDisplayFieldState.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this._item = value;
            if (!this.field.asyncValue) {
                this.value = value[this.field.key];
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernDisplayFieldState.prototype, "field", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDisplayFieldState.prototype, "value", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDisplayFieldState.prototype, "isLoading", void 0);
    __decorate([
        mobx_1.computed
    ], ModernDisplayFieldState.prototype, "item", null);
    __decorate([
        mobx_1.action
    ], ModernDisplayFieldState.prototype, "init", void 0);
    return ModernDisplayFieldState;
}());
exports.default = ModernDisplayFieldState;
//# sourceMappingURL=ModernDisplayFieldState.js.map