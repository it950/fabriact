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
var Image_1 = require("office-ui-fabric-react/lib/Image");
var ModernState_1 = require("../../utilities/ModernState");
var ModernItemPanelState = /** @class */ (function (_super) {
    __extends(ModernItemPanelState, _super);
    function ModernItemPanelState(item, titleProperty, descriptionProperty, secondaryDescriptionProperty, colorProperty, imageProperty, language) {
        if (language === void 0) { language = null; }
        var _this = _super.call(this, language) || this;
        _this.imageStateChanged = function (newState) {
            if (newState == Image_1.ImageLoadState.error) {
                _this.imageError = true;
            }
        };
        _this.item = item;
        _this.colorProperty = colorProperty;
        _this.descriptionProperty = descriptionProperty;
        _this.imageProperty = imageProperty;
        _this.secondaryDescriptionProperty = secondaryDescriptionProperty;
        _this.titleProperty = titleProperty;
        return _this;
    }
    Object.defineProperty(ModernItemPanelState.prototype, "color", {
        get: function () {
            if (this.item && this.colorProperty && this.item[this.colorProperty]) {
                return this.item[this.colorProperty];
            }
            return "#5f6163";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernItemPanelState.prototype, "image", {
        get: function () {
            if (this.item && this.imageProperty) {
                return this.item[this.imageProperty];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernItemPanelState.prototype, "description", {
        get: function () {
            if (this.item && this.descriptionProperty) {
                return this.item[this.descriptionProperty];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernItemPanelState.prototype, "secondaryDescription", {
        get: function () {
            if (this.item && this.secondaryDescriptionProperty) {
                return this.item[this.secondaryDescriptionProperty];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernItemPanelState.prototype, "title", {
        get: function () {
            if (this.item && this.titleProperty) {
                return this.item[this.titleProperty];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "item", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "titleProperty", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "descriptionProperty", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "imageError", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "secondaryDescriptionProperty", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "colorProperty", void 0);
    __decorate([
        mobx_1.observable
    ], ModernItemPanelState.prototype, "imageProperty", void 0);
    __decorate([
        mobx_1.computed
    ], ModernItemPanelState.prototype, "color", null);
    __decorate([
        mobx_1.computed
    ], ModernItemPanelState.prototype, "image", null);
    __decorate([
        mobx_1.computed
    ], ModernItemPanelState.prototype, "description", null);
    __decorate([
        mobx_1.computed
    ], ModernItemPanelState.prototype, "secondaryDescription", null);
    __decorate([
        mobx_1.computed
    ], ModernItemPanelState.prototype, "title", null);
    __decorate([
        mobx_1.action
    ], ModernItemPanelState.prototype, "imageStateChanged", void 0);
    return ModernItemPanelState;
}(ModernState_1.default));
exports.default = ModernItemPanelState;
//# sourceMappingURL=ModernItemPanelState.js.map