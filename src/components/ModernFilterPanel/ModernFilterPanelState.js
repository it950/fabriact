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
var ModernFilterPanelState = /** @class */ (function (_super) {
    __extends(ModernFilterPanelState, _super);
    function ModernFilterPanelState(field, currentFilters, onApplyEvent, onDismissEvent, getFilterOptionsEvent, language) {
        var _this = _super.call(this, language) || this;
        _this.onApplyEvent = onApplyEvent;
        _this.onDismissEvent = onDismissEvent;
        _this.getFilterOptionsEvent = getFilterOptionsEvent;
        _this.onDismiss = function () {
            _this.options = null;
            _this.onDismissEvent();
        };
        _this.getOptions = function () {
            if (_this.field) {
                rxjs_1.from(_this.getFilterOptionsEvent(_this.field.key)).pipe(operators_1.map(function (p) {
                    _this.options = p.map(function (v) {
                        v.isChecked = _this.currentFilters && _this.currentFilters.findIndex(function (c) { return c == v.id; }) > -1;
                        return v;
                    });
                })).subscribe();
            }
        };
        _this.update = function (value, isChecked) {
            var current = _this.options.find(function (v) { return v.id == value; });
            current.isChecked = isChecked;
        };
        _this.onFooterButtonClick = function (key) {
            switch (key) {
                case "Apply":
                    rxjs_1.from(_this.onApplyEvent(_this.field.key, mobx_1.toJS(_this.options.filter(function (g) { return g.isChecked; }).map(function (g) { return g.id; })))).subscribe();
                    break;
                case "Clear":
                    _this.options = _this.options.map(function (v) {
                        v.isChecked = false;
                        return v;
                    });
                    break;
            }
        };
        _this.field = field;
        _this.currentFilters = currentFilters;
        return _this;
    }
    Object.defineProperty(ModernFilterPanelState.prototype, "panelTitle", {
        get: function () {
            if (this.field) {
                if (this.checkedValueCount > 0) {
                    return this.strings.filterBy + " " + this.field.name + " (" + this.checkedValueCount + ")";
                }
                return this.strings.filterBy + " " + this.field.name;
            }
            return this.strings.filterBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernFilterPanelState.prototype, "isLoaded", {
        get: function () {
            return this.options != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernFilterPanelState.prototype, "checkedValueCount", {
        get: function () {
            if (this.options) {
                return this.options.filter(function (f) { return f.isChecked; }).length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernFilterPanelState.prototype, "footerButtons", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
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
    return ModernFilterPanelState;
}(ModernState_1.default));
exports.default = ModernFilterPanelState;
//# sourceMappingURL=ModernFilterPanelState.js.map