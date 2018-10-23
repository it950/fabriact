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
var ModernState_1 = require("../../utilities/ModernState");
var ModernFormValidator_1 = require("../ModernForm/ModernFormValidator");
var ModernEditItemPanelState = /** @class */ (function (_super) {
    __extends(ModernEditItemPanelState, _super);
    function ModernEditItemPanelState(item, fields, onDismissEvent, onUpdateItem, language) {
        var _this = _super.call(this, language) || this;
        _this.onDismissEvent = onDismissEvent;
        _this.onUpdateItem = onUpdateItem;
        _this.onDismiss = function () {
            _this.item = null;
            _this.onDismissEvent();
        };
        _this.onFooterButtonClick = function (key) {
            switch (key) {
                case "Save":
                    if (_this.validator.validateForm()) {
                        console.log(mobx_1.toJS(_this.item));
                        _this.isSaving = true;
                        rxjs_1.from(_this.onUpdateItem(mobx_1.toJS(_this.item)))
                            .pipe(operators_1.map(function (y) {
                            _this.isSaving = false;
                            _this.item = null;
                            _this.validator = new ModernFormValidator_1.default(_this.strings);
                        })).subscribe();
                    }
                    break;
                case "Cancel":
                    _this.onDismiss();
                    break;
            }
        };
        _this.item = item;
        _this.fields = fields;
        _this.validator = new ModernFormValidator_1.default(_this.strings);
        return _this;
    }
    Object.defineProperty(ModernEditItemPanelState.prototype, "footerButtons", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
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
    return ModernEditItemPanelState;
}(ModernState_1.default));
exports.default = ModernEditItemPanelState;
//# sourceMappingURL=ModernEditItemPanelState.js.map