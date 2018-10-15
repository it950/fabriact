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
//import locales from "../../utilities/locales";
class ModernOfficeListStore {
    constructor(views, newItemFields, onSearchEvent, onViewChangeEvent, onNewItemEvent, language = null) {
        this.onSearchEvent = onSearchEvent;
        this.onViewChangeEvent = onViewChangeEvent;
        this.onNewItemEvent = onNewItemEvent;
        this.onNewItemClicked = () => {
            console.log("111");
            this.newItemFormVisible = true;
            this.onNewItemEvent().then(y => {
                console.log("2222111");
                this.newItem = y;
                //    this.newFormConfig.item = y;
            });
        };
        this.onViewChange = (key) => {
            //this.detailsListConfig.items = null;
            this.onViewChangeEvent(key);
        };
        this.onItemSaved = () => {
            //   this.detailsListConfig.items = null;
            //   this.onViewChangeEvent(this.commandBarConfig.currentViewKey);
        };
        this.onSearch = (search) => {
            //     this.detailsListConfig.items = null;
            this.onSearchEvent(search);
        };
        this.locale = new locales_1.default(language);
        //this.commandBarConfig = new ModernCommandBarConfig({
        //    onNewClicked: this.onNewItemClicked,
        //    hideDelete: !this.showDeleteButton,
        //    //    onViewClicked: config ? config.onViewChange : null
        //});
        //console.log(this.locale.strings.next);
        ////this.newFormConfig = new ModernNewFormPanelConfig({
        ////    onSaveNewItem: config.onSaveNewItem,
        ////    onItemSaved: this.onItemSaved,
        ////    language: config.language
        ////});
        ////   this.newFormConfig.locale = this.locale;
        //this.detailsListConfig = new ModernDetailsListConfig();
        //if (config) {
        //    this.commandBarConfig.views = config.views;
        //    this.commandBarConfig.actions = config.actions;
        //    this.commandBarConfig.currentViewKey = config.defaultView;
        //    this.detailsListConfig.items = config.items;
        //    //    this.newFormConfig.groups = config.newItemGroups;
        //    //  console.log("grousp");
        //    //  console.log(this.newFormConfig.groups);
        //    //     this.detailsListConfig.items = config.items;
        //}
        ////reaction(() => this.commandBarConfig.currentViewKey, (currentViewKey) => {
        ////    this.config.onViewChange(currentViewKey);
        ////});
        //reaction(() => this.commandBarConfig.currentViewKey, this.onViewChange);
        //reaction(() => this.commandBarConfig.searchValue, this.onSearch);
        //reaction(() => this.commandBarConfig.searchValue, this.onSearch);
    }
    get showDeleteButton() {
        return false;
        //    return !this.hideDelete && this.detailsListConfig && this.detailsListConfig.selectedItemCount > 0;
    }
}
__decorate([
    mobx_1.observable
], ModernOfficeListStore.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListStore.prototype, "newItem", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListStore.prototype, "newItemFormVisible", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListStore.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.computed
], ModernOfficeListStore.prototype, "showDeleteButton", null);
__decorate([
    mobx_1.action
], ModernOfficeListStore.prototype, "onNewItemClicked", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListStore.prototype, "onViewChange", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListStore.prototype, "onItemSaved", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListStore.prototype, "onSearch", void 0);
exports.default = ModernOfficeListStore;
//# sourceMappingURL=ModernOfficeListStore.js.map