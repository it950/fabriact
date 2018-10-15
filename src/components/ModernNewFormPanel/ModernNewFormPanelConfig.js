"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const locales_1 = require("../../utilities/locales");
class ModernNewFormPanelConfig {
    constructor(groups, onSaveNewItem, language = null) {
        this.onSaveNewItem = onSaveNewItem;
        //@observable
        //public title: string;
        this.step = 0;
        this.onFieldChange = (key, value) => {
            this.item[key] = value;
        };
        this.onValidated = (isValid) => {
            this.isValid = isValid;
        };
        this.onDismiss = () => {
            // this.options.onNewClicked();
            this.isVisible = false;
            this.item = null;
            this.step = 0;
        };
        //@computed
        //get isItemValid() {
        //    if (this.fields) {
        //        let errors = this.fields.map(f => this.editItemConfig.validateField(f, this.item[f.key]));
        //        console.log(errors);
        //        return errors.filter(t => t != "").length == 0;
        //    }
        //    return false;
        //}
        this.onFooterButtonClick = (key) => {
            console.log(key);
            console.log(this.isValid);
            console.log(mobx_1.toJS(this.item));
            //this.editItemConfig.fields.forEach(f => {
            //    this.item[f.key] = this.editItemConfig.item[f.key];
            //});
            switch (key) {
                case "Back":
                    this.step--;
                    break;
                case "Next":
                    //var valid = this.editItemConfig.validateForm();
                    this.forceValidation = true;
                    if (this.isValid) {
                        console.log("wwooosjs");
                        //    this.editItemConfig.fields.forEach(f => {
                        //        this.item[f.key] = this.editItemConfig.item[f.key];
                        //    });
                        //    console.log(this.item);
                        this.step++;
                    }
                    //   console.error(this.isItemValid);
                    break;
                case "Finish":
                    this.forceValidation = true;
                    if (this.isValid) {
                        console.log(this.item);
                        this.isSaving = true;
                        this.onSaveNewItem(mobx_1.toJS(this.item)).then(() => {
                            this.isVisible = false;
                            //   this.config.onItemSaved(null);
                        });
                    }
                    // let errors = this.fields.map(f => this.editItemConfig.validateField(f, this.item[f.key]));
                    //    console.error(this.editItemConfig.validateForm);
                    //var valid = this.editItemConfig.validateForm();
                    //if (valid) {
                    //    this.editItemConfig.fields.forEach(f => {
                    //        this.item[f.key] = this.editItemConfig.item[f.key];
                    //    });
                    //    this.isSaving = true;
                    //   // console.error(this.isItemValid);
                    //    this.config.onSaveNewItem(toJS(this.item)).then(() => {
                    //        console.log("wootoher");
                    //        this.isVisible = false;
                    //        this.config.onItemSaved(null);
                    //    }, (error) => {
                    //    });
                    //}
                    break;
            }
        };
        this.locale = new locales_1.default(language);
        this.groups = groups;
    }
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.step].fields;
        }
        return null;
    }
    get isLoaded() {
        return this.fields != null && this.item != null;
    }
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }
        return {};
    }
    get footerButtons() {
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
    }
}
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "isSaving", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "isValid", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "step", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "groups", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "isVisible", void 0);
__decorate([
    mobx_1.observable
], ModernNewFormPanelConfig.prototype, "forceValidation", void 0);
__decorate([
    mobx_1.computed
], ModernNewFormPanelConfig.prototype, "fields", null);
__decorate([
    mobx_1.computed
], ModernNewFormPanelConfig.prototype, "isLoaded", null);
__decorate([
    mobx_1.action
], ModernNewFormPanelConfig.prototype, "onFieldChange", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelConfig.prototype, "onValidated", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelConfig.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernNewFormPanelConfig.prototype, "onFooterButtonClick", void 0);
__decorate([
    mobx_1.computed
], ModernNewFormPanelConfig.prototype, "strings", null);
__decorate([
    mobx_1.computed
], ModernNewFormPanelConfig.prototype, "footerButtons", null);
exports.default = ModernNewFormPanelConfig;
//# sourceMappingURL=ModernNewFormPanelConfig.js.map