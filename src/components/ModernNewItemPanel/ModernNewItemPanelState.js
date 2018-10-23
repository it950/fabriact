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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModernFormValidator_1 = require("../ModernForm/ModernFormValidator");
var ModernState_1 = require("../../utilities/ModernState");
var ModernNewItemPanelState = /** @class */ (function (_super) {
    __extends(ModernNewItemPanelState, _super);
    function ModernNewItemPanelState(item, groups, onSaveNewItem, onDismissEvent, title, language) {
        var _this = _super.call(this, language) || this;
        _this.onSaveNewItem = onSaveNewItem;
        _this.onDismissEvent = onDismissEvent;
        _this.step = 0;
        _this.onDismiss = function () {
            _this.item = null;
            _this.step = 0;
            _this.onDismissEvent();
        };
        _this.onFooterButtonClick = function (key) {
            console.log(mobx_1.toJS(_this.item));
            switch (key) {
                case "Back":
                    _this.step--;
                    break;
                case "Next":
                    if (_this.validator.validateForm()) {
                        _this.step++;
                    }
                    break;
                case "Finish":
                    if (_this.validator.validateForm()) {
                        _this.isSaving = true;
                        rxjs_1.from(_this.onSaveNewItem(mobx_1.toJS(_this.item)))
                            .pipe(operators_1.map(function (y) {
                            _this.isSaving = false;
                            _this.step = 0;
                            _this.item = null;
                            _this.validator = new ModernFormValidator_1.default(_this.strings);
                        })).subscribe();
                    }
                    break;
            }
        };
        _this.item = item;
        _this.groups = groups;
        _this.title = title;
        _this.validator = new ModernFormValidator_1.default(_this.strings);
        return _this;
    }
    Object.defineProperty(ModernNewItemPanelState.prototype, "panelTitle", {
        get: function () {
            if (this.title) {
                return this.title;
            }
            return this.strings.newItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernNewItemPanelState.prototype, "fields", {
        get: function () {
            if (this.groups && this.groups.length > 0) {
                return this.groups[this.step].fields.filter(function (a) { return !a.readOnly; });
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernNewItemPanelState.prototype, "isLoaded", {
        get: function () {
            return this.fields != null && this.item != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernNewItemPanelState.prototype, "footerButtons", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
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
    return ModernNewItemPanelState;
}(ModernState_1.default));
exports.default = ModernNewItemPanelState;
//# sourceMappingURL=ModernNewItemPanelState.js.map