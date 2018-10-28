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
var Modern_Types_1 = require("../../Modern.Types");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var ModernState_1 = require("../../utilities/ModernState");
var operators_1 = require("rxjs/operators");
var Papa = require("papaparse");
var file_saver_1 = require("file-saver");
var ModernCommandBarState = /** @class */ (function (_super) {
    __extends(ModernCommandBarState, _super);
    function ModernCommandBarState(views, compact, onSearchEvent, onViewChangeEvent, onDeleteConfirmedEvent, onViewOffsetChanged, onActionClickedEvent, onExportEvent, onNewItemEvent, onSaveNewItemEvent, getNewActionFieldsEvent, getNewActionItemEvent, onSaveActionItemEvent, selectedItemCount, selectedView, hideNew, hideDelete, hideSearch, language) {
        var _this = _super.call(this, language) || this;
        _this.onSearchEvent = onSearchEvent;
        _this.onViewChangeEvent = onViewChangeEvent;
        _this.onDeleteConfirmedEvent = onDeleteConfirmedEvent;
        _this.onViewOffsetChanged = onViewOffsetChanged;
        _this.onActionClickedEvent = onActionClickedEvent;
        _this.onExportEvent = onExportEvent;
        _this.onNewItemEvent = onNewItemEvent;
        _this.onSaveNewItemEvent = onSaveNewItemEvent;
        _this.getNewActionFieldsEvent = getNewActionFieldsEvent;
        _this.getNewActionItemEvent = getNewActionItemEvent;
        _this.onSaveActionItemEvent = onSaveActionItemEvent;
        _this.views = [];
        _this.viewOffset = 0;
        _this.viewType = 0;
        _this.onSaveNewActionItem = function (item) {
            return rxjs_1.from(_this.onSaveActionItemEvent(_this.currentActionId, item)).pipe(operators_1.map(function (o) {
                //    this.newActionItemFormVisible = false;
                _this.currentActionId = null;
            })).toPromise();
        };
        _this.onNewActionItemDismiss = function () {
            _this.currentActionId = null;
        };
        _this.onActionClicked = function (action) {
            console.log(action);
            var act = _this.currentView.actions.find(function (g) { return g.key == action; });
            switch (act.type) {
                case Modern_Types_1.ModernActionType.form:
                    _this.currentActionId = act.key;
                    //  this.newActionItemFormVisible = true;
                    rxjs_1.zip(rxjs_1.from(_this.getNewActionFieldsEvent(action)), rxjs_1.from(_this.getNewActionItemEvent(action))).pipe(operators_1.map(function (g) {
                        _this.newActionFields = g[0];
                        _this.newActionItem = g[1];
                    })).subscribe();
                    break;
                case Modern_Types_1.ModernActionType.service:
                    rxjs_1.from(_this.onActionClickedEvent(action)).subscribe();
                    break;
            }
        };
        _this.onSaveNewItem = function (item) {
            return rxjs_1.from(_this.onSaveNewItemEvent(item))
                .pipe(operators_1.map(function (y) {
                _this.newItemFormVisible = false;
            }), operators_1.switchMap(function () { return rxjs_1.from(_this.onViewChangeEvent(_this.currentViewKey)); })).toPromise();
        };
        _this.showListView = function () {
            _this.viewType = 0;
        };
        _this.showTileView = function () {
            _this.viewType = 1;
        };
        _this.onDeleteCanceled = function () {
            _this.confirmDeleteDialogVisible = false;
        };
        _this.onDeleteConfirmed = function () {
            _this.confirmDeleteDialogVisible = false;
            rxjs_1.from(_this.onDeleteConfirmedEvent()).subscribe();
        };
        _this.onDelete = function () {
            _this.confirmDeleteDialogVisible = true;
        };
        _this.onExport = function () {
            rxjs_1.from(_this.onExportEvent()).pipe(operators_1.map(function (i) {
                var unparse = Papa.unparse(i, {
                    quotes: false,
                    quoteChar: '"',
                    escapeChar: '"',
                    delimiter: ";",
                    header: true,
                    newline: "\r\n"
                });
                file_saver_1.saveAs(new Blob([unparse], { type: "text/csv;charset=utf-8" }), _this.currentViewName + "_" + new Date().toString() + ".csv");
            })).subscribe();
            //  this.onDeleteClickedEvent();
        };
        _this.nextOffset = function () {
            _this.viewOffset++;
            _this.offsetChange();
        };
        _this.offsetChange = function () {
            if (_this.offsetSubscription) {
                _this.offsetSubscription.unsubscribe();
            }
            _this.offsetSubscription = rxjs_1.from(_this.onViewOffsetChanged(_this.viewOffset)).subscribe();
        };
        _this.previousOffset = function () {
            _this.viewOffset--;
            _this.offsetChange();
        };
        _this.viewClicked = function (viewKey) {
            if (viewKey != _this.currentViewKey) {
                _this.currentViewKey = viewKey;
                if (_this.viewSubscription) {
                    _this.viewSubscription.unsubscribe();
                }
                _this.viewSubscription = rxjs_1.from(_this.onViewChangeEvent(viewKey)).subscribe();
            }
        };
        _this.onNewItemDismissed = function () {
            _this.newItemFormVisible = false;
        };
        _this.onNewItemClicked = function () {
            _this.newItemFormVisible = true;
            rxjs_1.from(_this.onNewItemEvent())
                .pipe(operators_1.map(function (y) {
                _this.newItem = y;
            })).subscribe();
        };
        _this.hideDelete = hideDelete;
        _this.hideSearch = hideSearch;
        _this.hideNew = hideNew;
        _this.views = views;
        _this.compact = compact;
        _this.currentViewKey = selectedView;
        _this.selectedItemCount = selectedItemCount;
        return _this;
    }
    Object.defineProperty(ModernCommandBarState.prototype, "newActionItemFormVisible", {
        get: function () {
            return this.currentActionId != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernCommandBarState.prototype, "currentAction", {
        get: function () {
            var _this = this;
            if (this.currentActionId) {
                return this.currentView.actions.find(function (i) { return i.key == _this.currentActionId; });
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernCommandBarState.prototype, "currentViewName", {
        get: function () {
            if (this.currentView) {
                return this.currentView.name;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernCommandBarState.prototype, "currentView", {
        get: function () {
            var _this = this;
            if (this.views && this.currentViewKey) {
                return this.views.find(function (f) { return f.key == _this.currentViewKey; });
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernCommandBarState.prototype, "items", {
        get: function () {
            var _this = this;
            var result = this.currentView && this.currentView.actions ? this.currentView.actions
                .filter(function (g) { return g.selectionMode == DetailsList_1.SelectionMode.none && _this.selectedItemCount == 0
                || g.selectionMode == DetailsList_1.SelectionMode.single && _this.selectedItemCount == 1
                || g.selectionMode == DetailsList_1.SelectionMode.multiple && _this.selectedItemCount > 0; })
                .map(function (t) {
                t.onClick = function () {
                    _this.onActionClicked(t.key);
                    //  from(this.onActionClickedEvent(t.key)).subscribe();
                    //    this.actionClicked(t.key);
                };
                return t;
            }) : [];
            result = !this.hideNew ? [{
                    key: "new",
                    icon: "Add",
                    name: this.strings.new,
                    onClick: this.onNewItemClicked
                }].concat(result) : result;
            result = !this.hideSearch && !this.compact ? [{
                    key: "search",
                }].concat(result) : result;
            result = this.onExportEvent && this.selectedItemCount == 0 ? result.concat([{
                    key: "export",
                    icon: "ExcelLogo",
                    name: this.strings.export,
                    onClick: this.onExport
                }]) : result;
            result = !this.hideDelete ? result.concat([{
                    key: "delete",
                    icon: "Delete",
                    name: this.strings.delete,
                    onClick: this.onDelete
                }]) : result;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernCommandBarState.prototype, "farItems", {
        get: function () {
            var _this = this;
            if (this.compact) {
                return [];
            }
            var icon = this.viewType == 0 ? 'List' : 'GridViewMedium';
            //var typeItems: any[] =
            //    [
            //        {
            //            key: "List",
            //            name: "List",
            //            icon: "List",
            //            canCheck: true,
            //            checked: this.viewType == 0,
            //            onClick: this.showListView
            //        },
            //        {
            //            key: "Tiles",
            //            name: "Tiles",
            //            icon: "GridViewMedium",
            //            canCheck: true,
            //            checked: this.viewType == 1,
            //            onClick: this.showTileView
            //        },
            //        {
            //            key: 'divider_1',
            //            itemType: ContextualMenuItemType.Divider
            //        }
            //    ];
            var typeItems = [];
            var items = typeItems.concat(this.views.map(function (t) {
                t.onClick = function () {
                    _this.viewClicked(t.key);
                };
                t.checked = _this.currentViewKey == t.key;
                return t;
            }));
            var menu = [
                {
                    key: 'currentView',
                    name: this.currentViewName,
                    icon: icon,
                    subMenuProps: {
                        items: items,
                    }
                }
            ];
            if (this.currentView && this.currentView.isDynamicView) {
                menu.unshift({
                    key: 'previousMonth',
                    icon: 'ChevronLeft',
                    isSubMenu: false,
                    onClick: this.previousOffset
                });
                menu.push({
                    key: 'nextMonth',
                    icon: 'ChevronRight',
                    isSubMenu: false,
                    onClick: this.nextOffset
                });
            }
            return menu;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "selectedItemCount", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "newItem", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "newItemFormVisible", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "views", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "hideNew", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "viewOffset", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "hideDelete", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "hideSearch", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "compact", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "currentViewKey", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "confirmDeleteDialogVisible", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "viewType", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "currentActionId", void 0);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "newActionItemFormVisible", null);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "currentAction", null);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "newActionItem", void 0);
    __decorate([
        mobx_1.observable
    ], ModernCommandBarState.prototype, "newActionFields", void 0);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "currentViewName", null);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "currentView", null);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "items", null);
    __decorate([
        mobx_1.computed
    ], ModernCommandBarState.prototype, "farItems", null);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onSaveNewActionItem", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onNewActionItemDismiss", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onActionClicked", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onSaveNewItem", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "showListView", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "showTileView", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onDeleteCanceled", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onDeleteConfirmed", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onDelete", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onExport", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "nextOffset", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "offsetChange", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "previousOffset", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "viewClicked", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onNewItemDismissed", void 0);
    __decorate([
        mobx_1.action
    ], ModernCommandBarState.prototype, "onNewItemClicked", void 0);
    return ModernCommandBarState;
}(ModernState_1.default));
exports.default = ModernCommandBarState;
//# sourceMappingURL=ModernCommandBarState.js.map