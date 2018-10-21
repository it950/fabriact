"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const ModernState_1 = require("../../utilities/ModernState");
class ModernOfficeListState extends ModernState_1.default {
    constructor(items, hasNextPage, views, itemIdProperty, hideDelete, onNextPageEvent, onSearchEvent, onViewChangeEvent, onNewItemEvent, onSaveNewItemEvent, onDeleteItemEvent, onUpdateItemEvent, onViewOffsetChangeEvent, onSortChangedEvent, onFilterChangedEvent, defaultViewId, language) {
        super(language);
        this.onNextPageEvent = onNextPageEvent;
        this.onSearchEvent = onSearchEvent;
        this.onViewChangeEvent = onViewChangeEvent;
        this.onNewItemEvent = onNewItemEvent;
        this.onSaveNewItemEvent = onSaveNewItemEvent;
        this.onDeleteItemEvent = onDeleteItemEvent;
        this.onUpdateItemEvent = onUpdateItemEvent;
        this.onViewOffsetChangeEvent = onViewOffsetChangeEvent;
        this.onSortChangedEvent = onSortChangedEvent;
        this.onFilterChangedEvent = onFilterChangedEvent;
        this.selectedItems = [];
        this.currentViewType = 0;
        this.onSortChanged = (column, ascending) => {
            this.items = null;
            return rxjs_1.from(this.onSortChangedEvent(column, ascending))
                .pipe(operators_1.map((y) => {
                this.items = y;
                return y;
            })).toPromise();
        };
        this.onFilterChanged = (filters) => {
            this.items = null;
            return rxjs_1.from(this.onFilterChangedEvent(filters))
                .pipe(operators_1.map((y) => {
                this.items = y;
                return y;
            })).toPromise();
        };
        this.onUpdateItem = (item) => {
            return rxjs_1.from(this.onUpdateItemEvent(item)).pipe(operators_1.map(v => {
                let currentItem = this.items.find(g => g[this.itemIdProperty] == item[this.itemIdProperty]);
                var keys = Object.keys(item);
                keys.filter(g => g != this.itemIdProperty).forEach(k => {
                    currentItem[k] = item[k];
                });
            })).toPromise();
        };
        this.getNextPage = () => {
            return rxjs_1.from(this.onNextPageEvent())
                .pipe(operators_1.map((y) => {
                if (this.items) {
                    this.items = this.items.concat(y);
                }
            })).toPromise();
        };
        this.onSelectionChanged = () => {
            const selectedItems = this.selection.getSelection();
            if (selectedItems.length == 0 || selectedItems.length < this.selectedItems.length) {
                this.currentViewItem = null;
            }
            else {
                if (selectedItems.length == 1 && this.selectedItems.length < 2) {
                    this.currentViewItem = selectedItems[0];
                }
            }
            this.selectedItems = selectedItems;
        };
        this.onDeleteItem = (item) => {
            return rxjs_1.from(this.onDeleteItemEvent(mobx_1.toJS(item))).pipe(operators_1.map(v => {
                this.items = this.items.filter(a => a[this.itemIdProperty] != item[this.itemIdProperty]);
            })).toPromise();
        };
        this.onDeleteConfirmed = () => {
            var dsds = this.selectedItems.map(c => rxjs_1.from(this.onDeleteItemEvent(mobx_1.toJS(c))));
            return rxjs_1.concat(dsds).toPromise();
            //.subscribe()
            //   concatMap(c => from(this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))))));
            //.subscribe(res => console.log("sasasa" + res));;
            //concat(ddas).subscribe(res => console.log("sasasa" + res));
            // this.onDeleteItemEvent()
            //var deleteItems = 
            //this.newItemFormVisible = false;
        };
        this.onSearchCleared = () => {
            this.searchValue = null;
            if (this.viewSubscription) {
                this.viewSubscription.unsubscribe();
            }
            this.viewSubscription = rxjs_1.from(this.onViewChange(this.views[0].key)).subscribe();
        };
        this.onViewOffsetChange = (offset) => {
            this.items = null;
            return rxjs_1.from(this.onViewOffsetChangeEvent(offset))
                .pipe(operators_1.map((y) => {
                this.items = y;
            })).toPromise();
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
            this.searchValue = search;
            this.currentViewId = "search";
            this.items = null;
            return rxjs_1.from(this.onSearchEvent(search))
                .pipe(operators_1.map((y) => {
                this.items = y;
            })).toPromise();
        };
        this.selection = new DetailsList_1.Selection({ onSelectionChanged: this.onSelectionChanged });
        this.items = items;
        this.currentViewId = defaultViewId;
        this.views = views;
        this.hasNextPage = hasNextPage;
        this.itemIdProperty = itemIdProperty;
        this.hideDelete = hideDelete;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
        if (value) {
            this.selection.setItems(value, true);
        }
    }
    get selectedItemCount() {
        if (this.selectedItems) {
            return this.selectedItems.length;
        }
        return 0;
    }
    get currentViews() {
        if (this.views) {
            let views = mobx_1.toJS(this.views);
            if (this.searchValue) {
                views.push({
                    name: `${this.strings.search}: ${this.searchValue}`,
                    key: "search",
                    fields: this.views[0].fields
                });
            }
            return views;
        }
        return [];
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
    get actions() {
        if (this.currentView && this.currentView.actions) {
            return this.currentView.actions;
        }
        return [];
    }
    get currentView() {
        return this.currentViews.find(a => a.key == this.currentViewId);
    }
    get currentViewName() {
        const currentView = this.currentView;
        if (currentView) {
            return currentView.name;
        }
        return null;
    }
}
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "searchValue", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "_items", void 0);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "items", null);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "currentViewId", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "hasNextPage", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "selectedItems", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "currentViewItem", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "itemIdProperty", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "currentViewType", void 0);
__decorate([
    mobx_1.observable
], ModernOfficeListState.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "selectedItemCount", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "currentViews", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "showDeleteButton", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "viewFields", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "actions", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "currentView", null);
__decorate([
    mobx_1.computed
], ModernOfficeListState.prototype, "currentViewName", null);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSortChanged", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onFilterChanged", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onUpdateItem", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "getNextPage", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSelectionChanged", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onDeleteItem", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onDeleteConfirmed", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onSearchCleared", void 0);
__decorate([
    mobx_1.action
], ModernOfficeListState.prototype, "onViewOffsetChange", void 0);
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