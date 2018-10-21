"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const Image_1 = require("office-ui-fabric-react/lib/Image");
const ModernState_1 = require("../../utilities/ModernState");
class ModernItemPanelState extends ModernState_1.default {
    constructor(item, titleProperty, descriptionProperty, secondaryDescriptionProperty, colorProperty, imageProperty, language = null) {
        super(language);
        this.imageStateChanged = (newState) => {
            if (newState == Image_1.ImageLoadState.error) {
                this.imageError = true;
            }
        };
        this.item = item;
        this.colorProperty = colorProperty;
        this.descriptionProperty = descriptionProperty;
        this.imageProperty = imageProperty;
        this.secondaryDescriptionProperty = secondaryDescriptionProperty;
        this.titleProperty = titleProperty;
    }
    get color() {
        if (this.item && this.colorProperty && this.item[this.colorProperty]) {
            return this.item[this.colorProperty];
        }
        return "#5f6163";
    }
    get image() {
        if (this.item && this.imageProperty) {
            return this.item[this.imageProperty];
        }
        return null;
    }
    get description() {
        if (this.item && this.descriptionProperty) {
            return this.item[this.descriptionProperty];
        }
        return null;
    }
    get secondaryDescription() {
        if (this.item && this.secondaryDescriptionProperty) {
            return this.item[this.secondaryDescriptionProperty];
        }
        return null;
    }
    get title() {
        if (this.item && this.titleProperty) {
            return this.item[this.titleProperty];
        }
        return null;
    }
}
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
exports.default = ModernItemPanelState;
//# sourceMappingURL=ModernItemPanelState.js.map