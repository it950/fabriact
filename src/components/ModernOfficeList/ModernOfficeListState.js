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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ModernOfficeListState {
    constructor(items, views, newItemFields, onSearchEvent, onViewChangeEvent, onNewItemEvent, onSaveNewItemEvent, onDeleteItemEvent, defaultViewId = null, language = null) {
        this.onSearchEvent = onSearchEvent;
        this.onViewChangeEvent = onViewChangeEvent;
        this.onNewItemEvent = onNewItemEvent;
        this.onSaveNewItemEvent = onSaveNewItemEvent;
        this.onDeleteItemEvent = onDeleteItemEvent;
        this.onSaveNewItem = (item) => {
            return rxjs_1.from(this.onSaveNewItemEvent(item))
                .pipe(operators_1.map(y => {
                this.newItemFormVisible = false;
            }), operators_1.switchMap(() => rxjs_1.from(this.onViewChange(this.currentViewId)))).toPromise();
        };
        this.onDelete = () => {
            this.confirmDeleteDialogVisible = true;
            //this.newItemFormVisible = false;
        };
        this.onDeleteConfirmed = () => {
            this.confirmDeleteDialogVisible = false;
            var dsds = this.selectedItems.map(c => rxjs_1.from(this.onDeleteItemEvent(mobx_1.toJS(c))));
            rxjs_1.concat(dsds).subscribe();
            //   concatMap(c => from(this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))))));
            //.subscribe(res => console.log("sasasa" + res));;
            //concat(ddas).subscribe(res => console.log("sasasa" + res));
            // this.onDeleteItemEvent()
            //var deleteItems = 
            //this.newItemFormVisible = false;
        };
        this.onDeleteCanceled = () => {
            this.confirmDeleteDialogVisible = false;
            //this.newItemFormVisible = false;
        };
        this.onNewItemDismissed = () => {
            this.newItemFormVisible = false;
        };
        this.onNewItemClicked = () => {
            this.newItemFormVisible = true;
            rxjs_1.from(this.onNewItemEvent())
                .pipe(operators_1.map(y => {
                this.newItem = y;
            })).subscribe();
        };
        this.onSelectionChanged = (selectedItems) => {
            this.selectedItems = selectedItems;
        };
        this.onViewChange = (key) => {
            this.items = null;
            this.currentViewId = key;
            return rxjs_1.from(this.onViewChangeEvent(key))
                .pipe(operators_1.map((y) => {
                this.items = y;
            })).toPromise();
        };
        this.onItemSaved = () => {
            //   this.detailsListConfig.items = null;
            //   this.onViewChangeEvent(this.commandBarConfig.currentViewKey);
        };
        this.onSearch = (search) => {
            this.items = null;
            rxjs_1.from(this.onSearchEvent(search))
                .pipe(operators_1.map((y) => {
                //    this.newItem = y;
                this.items = y;
            })).subscribe();
        };
        this.locale = new locales_1.default(language);
        this.items = items;
        this.currentViewId = defaultViewId;
        this.views = views;
    }
    get selectedItemCount() {
        if (this.selectedItems) {
            return this.selectedItems.length;
        }
        return 0;
    }
    get showDeleteButton() {
        return !this.hideDelete && this.selectedItemCount > 0;
    }
    get viewFields() {
        if (this.currentView) {
            return this.currentView.fields;
        }
        return [];
    }
    get currentView() {
        return this.views.find(a => a.key == this.currentViewId);
    }
}
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "newItem", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "items", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "currentViewId", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "selectedItems", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "newItemFormVisible", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "confirmDeleteDialogVisible", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "selectedItemCount", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "showDeleteButton", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "viewFields", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "currentView", null);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSaveNewItem", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onDelete", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onDeleteConfirmed", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onDeleteCanceled", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onNewItemDismissed", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onNewItemClicked", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSelectionChanged", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onViewChange", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onItemSaved", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSearch", void 0);
exports.default = ModernOfficeListState;
//# sourceMappingURL=ModernOfficeListState.js.map