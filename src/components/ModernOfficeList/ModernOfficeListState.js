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
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var ModernState_1 = require("../../utilities/ModernState");
var ModernOfficeListState = /** @class */ (function (_super) {
    __extends(ModernOfficeListState, _super);
    function ModernOfficeListState(items, hasNextPage, views, itemIdProperty, hideDelete, itemTitleProperty, onNextPageEvent, onSearchEvent, onViewChangeEvent, onNewItemEvent, onSaveNewItemEvent, onDeleteItemEvent, onUpdateItemEvent, onViewOffsetChangeEvent, onSortChangedEvent, onFilterChangedEvent, onActionClickedEvent, getNewActionFieldGroupsEvent, getNewActionItemEvent, onActionSavedEvent, defaultViewId, language) {
        var _this = _super.call(this, language) || this;
        _this.onNextPageEvent = onNextPageEvent;
        _this.onSearchEvent = onSearchEvent;
        _this.onViewChangeEvent = onViewChangeEvent;
        _this.onNewItemEvent = onNewItemEvent;
        _this.onSaveNewItemEvent = onSaveNewItemEvent;
        _this.onDeleteItemEvent = onDeleteItemEvent;
        _this.onUpdateItemEvent = onUpdateItemEvent;
        _this.onViewOffsetChangeEvent = onViewOffsetChangeEvent;
        _this.onSortChangedEvent = onSortChangedEvent;
        _this.onFilterChangedEvent = onFilterChangedEvent;
        _this.onActionClickedEvent = onActionClickedEvent;
        _this.getNewActionFieldGroupsEvent = getNewActionFieldGroupsEvent;
        _this.getNewActionItemEvent = getNewActionItemEvent;
        _this.onActionSavedEvent = onActionSavedEvent;
        _this.selectedItems = [];
        _this.currentViewType = 0;
        _this.onSortChanged = function (column, ascending) {
            _this.items = null;
            return rxjs_1.from(_this.onSortChangedEvent(column, ascending))
                .pipe(operators_1.map(function (y) {
                _this.items = y;
                return y;
            })).toPromise();
        };
        _this.onFilterChanged = function (filters) {
            _this.items = null;
            return rxjs_1.from(_this.onFilterChangedEvent(filters))
                .pipe(operators_1.map(function (y) {
                _this.items = y;
                return y;
            })).toPromise();
        };
        _this.onUpdateItem = function (item) {
            return rxjs_1.from(_this.onUpdateItemEvent(item)).pipe(operators_1.map(function (v) {
                var currentItem = _this.items.find(function (g) { return g[_this.itemIdProperty] == item[_this.itemIdProperty]; });
                var keys = Object.keys(item);
                keys.filter(function (g) { return g != _this.itemIdProperty; }).forEach(function (k) {
                    currentItem[k] = item[k];
                });
            })).toPromise();
        };
        _this.getNextPage = function () {
            return rxjs_1.from(_this.onNextPageEvent())
                .pipe(operators_1.map(function (y) {
                if (_this.items) {
                    _this.items = _this.items.concat(y);
                }
            })).toPromise();
        };
        _this.onSelectionChanged = function () {
            var selectedItems = _this.selection.getSelection();
            if (selectedItems.length == 0 || selectedItems.length < _this.selectedItems.length) {
                _this.currentViewItem = null;
            }
            else {
                if (selectedItems.length == 1 && _this.selectedItems.length < 2) {
                    _this.currentViewItem = selectedItems[0];
                }
            }
            _this.selectedItems = selectedItems;
        };
        _this.onDeleteItem = function (item) {
            return rxjs_1.from(_this.onDeleteItemEvent(mobx_1.toJS(item))).pipe(operators_1.map(function (v) {
                _this.items = _this.items.filter(function (a) { return a[_this.itemIdProperty] != item[_this.itemIdProperty]; });
            })).toPromise();
        };
        _this.onDeleteConfirmed = function () {
            var dsds = _this.selectedItems.map(function (c) { return rxjs_1.from(_this.onDeleteItemEvent(mobx_1.toJS(c))); });
            return rxjs_1.concat(dsds).toPromise();
            //.subscribe()
            //   concatMap(c => from(this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))))));
            //.subscribe(res => console.log("sasasa" + res));;
            //concat(ddas).subscribe(res => console.log("sasasa" + res));
            // this.onDeleteItemEvent()
            //var deleteItems = 
            //this.newItemFormVisible = false;
        };
        _this.onSearchCleared = function () {
            _this.searchValue = null;
            if (_this.viewSubscription) {
                _this.viewSubscription.unsubscribe();
            }
            _this.viewSubscription = rxjs_1.from(_this.onViewChange(_this.views[0].key)).subscribe();
        };
        _this.onViewOffsetChange = function (offset) {
            _this.items = null;
            return rxjs_1.from(_this.onViewOffsetChangeEvent(offset))
                .pipe(operators_1.map(function (y) {
                _this.items = y;
            })).toPromise();
        };
        _this.onViewChange = function (key) {
            _this.items = null;
            _this.currentViewId = key;
            return rxjs_1.from(_this.onViewChangeEvent(key))
                .pipe(operators_1.map(function (y) {
                _this.items = y;
            })).toPromise();
        };
        _this.onItemSaved = function () {
            //   this.detailsListConfig.items = null;
            //   this.onViewChangeEvent(this.commandBarConfig.currentViewKey);
        };
        _this.onSearch = function (search) {
            _this.searchValue = search;
            _this.currentViewId = "search";
            _this.items = null;
            return rxjs_1.from(_this.onSearchEvent(search))
                .pipe(operators_1.map(function (y) {
                _this.items = y;
            })).toPromise();
        };
        _this.getNewActionItem = function (action) {
            return _this.getNewActionItemEvent(action, mobx_1.toJS(_this.selectedItems));
        };
        _this.getNewActionFieldGroups = function (action) {
            return _this.getNewActionFieldGroupsEvent(action, mobx_1.toJS(_this.selectedItems));
        };
        _this.initProgress = function (total, title) {
            _this.processProgress = {
                current: 0,
                total: total,
                title: title
            };
        };
        _this.onActionClicked = function (action) {
            var actionItem = _this.actions.find(function (c) { return c.key == action; });
            if (_this.selectedItems.length > 0) {
                _this.initProgress(_this.selectedItems.length, actionItem.description);
                return rxjs_1.from(rxjs_1.from(_this.selectedItems).pipe(operators_1.concatMap(function (id) {
                    _this.processProgress.description = _this.selectedItems[_this.processProgress.current][_this.itemTitleProperty];
                    _this.processProgress.current++;
                    return _this.onActionClickedEvent(action, mobx_1.toJS(id));
                })).toPromise()).pipe(operators_1.switchMap(function (c) {
                    _this.processProgress = null;
                    return _this.onViewChange(_this.currentViewId);
                })).toPromise();
            }
            else {
                _this.initProgress(1, actionItem.description);
                return rxjs_1.from(_this.onActionClickedEvent(action, null)).pipe(operators_1.switchMap(function (c) {
                    _this.processProgress = null;
                    return _this.onViewChange(_this.currentViewId);
                })).toPromise();
            }
        };
        _this.onActionSaved = function (actionId, form) {
            if (_this.selectedItems.length > 0) {
                return rxjs_1.from(rxjs_1.from(_this.selectedItems).pipe(operators_1.concatMap(function (id) { return _this.onActionSavedEvent(actionId, form, mobx_1.toJS(id)); })).toPromise()).pipe(operators_1.switchMap(function (c) {
                    return _this.onViewChange(_this.currentViewId);
                })).toPromise();
            }
            else {
                return rxjs_1.from(_this.onActionSavedEvent(actionId, form, null)).pipe(operators_1.switchMap(function (c) {
                    return _this.onViewChange(_this.currentViewId);
                })).toPromise();
            }
        };
        _this.selection = new DetailsList_1.Selection({ onSelectionChanged: _this.onSelectionChanged });
        _this.items = items;
        _this.currentViewId = defaultViewId;
        _this.views = views;
        _this.hasNextPage = hasNextPage;
        _this.itemIdProperty = itemIdProperty;
        _this.itemTitleProperty = itemTitleProperty;
        _this.hideDelete = hideDelete;
        return _this;
    }
    Object.defineProperty(ModernOfficeListState.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            if (value) {
                this.selection.setItems(value, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "selectedItemCount", {
        get: function () {
            if (this.selectedItems) {
                return this.selectedItems.length;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "currentViews", {
        get: function () {
            if (this.views) {
                var views = mobx_1.toJS(this.views);
                if (this.searchValue) {
                    views.push({
                        name: this.strings.search + ": " + this.searchValue,
                        key: "search",
                        fields: this.views[0].fields
                    });
                }
                return views;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "showDeleteButton", {
        get: function () {
            return !this.hideDelete && this.selectedItemCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "viewFields", {
        get: function () {
            if (this.currentView) {
                return this.currentView.fields;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "actions", {
        get: function () {
            if (this.currentView && this.currentView.actions) {
                return this.currentView.actions;
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "currentView", {
        get: function () {
            var _this = this;
            return this.currentViews.find(function (a) { return a.key == _this.currentViewId; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "showProgress", {
        get: function () {
            return this.processProgress != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "currentViewName", {
        get: function () {
            var currentView = this.currentView;
            if (currentView) {
                return currentView.name;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernOfficeListState.prototype, "currentProgress", {
        get: function () {
            if (this.processProgress) {
                return this.processProgress.current / this.processProgress.total;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
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
    ], ModernOfficeListState.prototype, "itemTitleProperty", void 0);
    __decorate([
        mobx_1.observable
    ], ModernOfficeListState.prototype, "currentViewType", void 0);
    __decorate([
        mobx_1.observable
    ], ModernOfficeListState.prototype, "hideDelete", void 0);
    __decorate([
        mobx_1.observable
    ], ModernOfficeListState.prototype, "processProgress", void 0);
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
    ], ModernOfficeListState.prototype, "showProgress", null);
    __decorate([
        mobx_1.computed
    ], ModernOfficeListState.prototype, "currentViewName", null);
    __decorate([
        mobx_1.computed
    ], ModernOfficeListState.prototype, "currentProgress", null);
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
    __decorate([
        mobx_1.action
    ], ModernOfficeListState.prototype, "getNewActionItem", void 0);
    __decorate([
        mobx_1.action
    ], ModernOfficeListState.prototype, "getNewActionFieldGroups", void 0);
    __decorate([
        mobx_1.action
    ], ModernOfficeListState.prototype, "initProgress", void 0);
    __decorate([
        mobx_1.action
    ], ModernOfficeListState.prototype, "onActionClicked", void 0);
    __decorate([
        mobx_1.action
    ], ModernOfficeListState.prototype, "onActionSaved", void 0);
    return ModernOfficeListState;
}(ModernState_1.default));
exports.default = ModernOfficeListState;
//# sourceMappingURL=ModernOfficeListState.js.map