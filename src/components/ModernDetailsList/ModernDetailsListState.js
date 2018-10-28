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
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var Modern_Types_1 = require("../../Modern.Types");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var rxjs_1 = require("rxjs");
var ModernState_1 = require("../../utilities/ModernState");
var ModernDetailsListState = /** @class */ (function (_super) {
    __extends(ModernDetailsListState, _super);
    function ModernDetailsListState(items, currentViewItem, hasNextPage, fields, viewName, onSelectionChangedEvent, onSortChangedEvent, onFilterChangedEvent, language) {
        var _this = _super.call(this, language) || this;
        _this.onSelectionChangedEvent = onSelectionChangedEvent;
        _this.onSortChangedEvent = onSortChangedEvent;
        _this.onFilterChangedEvent = onFilterChangedEvent;
        _this.currentFilters = [];
        _this.selectedItems = [];
        _this.onDismissViewItemPanel = function () {
            _this.currentViewItem = null;
        };
        _this.contextualMenuDismissed = function () {
            _this.columnHeaderField = null;
        };
        _this.clearFilter = function (fieldId) {
            rxjs_1.from(_this.onFilterApplied(fieldId, null)).subscribe();
        };
        _this.onFilterApplied = function (field, values) {
            _this.currentFilterField = null;
            if (values && values.length > 0) {
                var filter = _this.currentFilters.find(function (t) { return t.field == field; });
                if (filter) {
                    filter.values = values;
                }
                else {
                    _this.currentFilters.push({
                        field: field,
                        values: values
                    });
                }
            }
            else {
                _this.currentFilters = _this.currentFilters.filter(function (t) { return t.field != field; });
            }
            return rxjs_1.from(_this.onFilterChangedEvent(mobx_1.toJS(_this.currentFilters))).toPromise();
        };
        _this.filterDismissed = function () {
            _this.currentFilterField = null;
        };
        _this.changeFilter = function (column) {
            _this.currentFilterField = _this.fields.find(function (f) { return f.key == column; });
        };
        _this.changeSort = function (column, ascending) {
            _this.sorting = {
                field: column,
                ascending: ascending
            };
            if (_this.sortSubscription) {
                _this.sortSubscription.unsubscribe();
            }
            _this.sortSubscription = rxjs_1.from(_this.onSortChangedEvent(column, ascending)).subscribe();
        };
        _this.columnClick = function (ev, column) {
            _this.columnHeaderField = {
                column: column.key,
                element: ev.currentTarget
            };
        };
        _this.items = items;
        _this.fields = fields;
        _this.hasNextPage = hasNextPage;
        _this.viewName = viewName;
        _this.currentViewItem = currentViewItem;
        return _this;
    }
    Object.defineProperty(ModernDetailsListState.prototype, "loadingText", {
        get: function () {
            if (this.viewName) {
                return this.strings.formatString(this.strings.loadingView, this.viewName);
            }
            return this.strings.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernDetailsListState.prototype, "contextualHeaderMenuProps", {
        get: function () {
            var _this = this;
            if (this.columnHeaderField) {
                var column_1 = this.columns.find(function (t) { return t.key == _this.columnHeaderField.column; });
                if (column_1 && column_1.columnActionsMode !== DetailsList_1.ColumnActionsMode.disabled) {
                    var field_1 = this.fields.find(function (h) { return h.key == column_1.key; });
                    var items = [];
                    if (field_1.sortable) {
                        switch (field_1.type) {
                            case Modern_Types_1.ModernFieldType.text:
                            case Modern_Types_1.ModernFieldType.lookup:
                            case Modern_Types_1.ModernFieldType.email:
                            case Modern_Types_1.ModernFieldType.phone:
                            case Modern_Types_1.ModernFieldType.login:
                            case Modern_Types_1.ModernFieldType.managedMetadata:
                            case Modern_Types_1.ModernFieldType.user:
                                items = [
                                    {
                                        key: 'aToZ',
                                        name: this.strings.sortOnTextAscending,
                                        canCheck: true,
                                        checked: column_1.isSorted && !column_1.isSortedDescending,
                                        onClick: function () { return _this.changeSort(column_1.key, true); }
                                    },
                                    {
                                        key: 'zToA',
                                        name: this.strings.sortOnTextDescending,
                                        canCheck: true,
                                        checked: column_1.isSorted && column_1.isSortedDescending,
                                        onClick: function () { return _this.changeSort(column_1.key, false); }
                                    },
                                ];
                                break;
                            case Modern_Types_1.ModernFieldType.dateTime:
                                items = [
                                    {
                                        key: 'oToN',
                                        name: this.strings.sortOnDateAscending,
                                        canCheck: true,
                                        checked: column_1.isSorted && !column_1.isSortedDescending,
                                        onClick: function () { return _this.changeSort(column_1.key, true); }
                                    },
                                    {
                                        key: 'nToO',
                                        name: this.strings.sortOnDateDescending,
                                        canCheck: true,
                                        checked: column_1.isSorted && column_1.isSortedDescending,
                                        onClick: function () { return _this.changeSort(column_1.key, false); }
                                    }
                                ];
                                break;
                            default:
                                break;
                        }
                    }
                    if (field_1.filterable) {
                        if (items.length > 0) {
                            items.push({
                                key: 'divider_1',
                                itemType: ContextualMenu_1.ContextualMenuItemType.Divider
                            });
                        }
                        var currentFilters = this.currentFilters.find(function (g) { return g.field == field_1.key; });
                        items.push({
                            key: 'filter',
                            name: currentFilters != null && currentFilters.values.length > 0
                                ? this.strings.filterBy + " (" + currentFilters.values.length + ")" : this.strings.filterBy,
                            //    name: (current.length == 0 ? `${this.root.strings.FilterBy}` : `${this.root.strings.FilterBy} (${current.length})`),
                            canCheck: false,
                            onClick: function () { return _this.changeFilter(column_1.key); }
                        });
                        if (currentFilters && currentFilters.values.length > 0) {
                            items.push({
                                key: 'clearfilters',
                                name: this.strings.clearFilters,
                                canCheck: false,
                                onClick: function () { return _this.clearFilter(column_1.key); }
                            });
                        }
                    }
                    //if (isGroupable(column.key)) {
                    //  items.push({
                    //    key: 'groupBy',
                    //    name: 'Group By ' + column.name,
                    //    icon: 'GroupedDescending',
                    //    canCheck: true,
                    //    checked: column.isGrouped,
                    //    onClick: () => this._onGroupByColumn(column)
                    //  });
                    //}
                    return {
                        items: items,
                        target: this.columnHeaderField.element,
                        directionalHint: 4 /* bottomLeftEdge */,
                        gapSpace: 10,
                        isBeakVisible: true,
                        onDismiss: this.contextualMenuDismissed
                    };
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernDetailsListState.prototype, "currentFilterPanelValues", {
        get: function () {
            var _this = this;
            if (this.currentFilters && this.currentFilterField) {
                var filter = this.currentFilters.find(function (t) { return t.field == _this.currentFilterField.key; });
                if (filter) {
                    return mobx_1.toJS(filter.values);
                }
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernDetailsListState.prototype, "listItems", {
        get: function () {
            if (this.items) {
                var items = mobx_1.toJS(this.items);
                if (this.hasNextPage) {
                    items.push(null);
                }
                return items;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernDetailsListState.prototype, "columns", {
        get: function () {
            var _this = this;
            return this.fields.map(function (field) {
                return {
                    key: field.key,
                    name: field.name,
                    minWidth: 30,
                    columnActionsMode: ((field.sortable || field.filterable) ? DetailsList_1.ColumnActionsMode.clickable : DetailsList_1.ColumnActionsMode.disabled),
                    isSorted: _this.sorting && _this.sorting.field == field.key ? true : false,
                    isSortedDescending: _this.sorting && _this.sorting.field == field.key && !_this.sorting.ascending ? true : false,
                    isFiltered: _this.currentFilters.findIndex(function (g) { return g.field == field.key; }) > -1,
                    maxWidth: (field.type == Modern_Types_1.ModernFieldType.image || field.type == Modern_Types_1.ModernFieldType.boolean || field.type == Modern_Types_1.ModernFieldType.number
                        || field.type == Modern_Types_1.ModernFieldType.percent || field.type == Modern_Types_1.ModernFieldType.currency || (field.type == Modern_Types_1.ModernFieldType.url && field.icon)) ? 50 : 150,
                    fieldName: field.key
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "columnHeaderField", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "items", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "hasNextPage", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "currentFilterField", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "currentFilters", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "viewName", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "fields", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "sorting", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "currentViewItem", void 0);
    __decorate([
        mobx_1.observable
    ], ModernDetailsListState.prototype, "selectedItems", void 0);
    __decorate([
        mobx_1.computed
    ], ModernDetailsListState.prototype, "loadingText", null);
    __decorate([
        mobx_1.computed
    ], ModernDetailsListState.prototype, "contextualHeaderMenuProps", null);
    __decorate([
        mobx_1.computed
    ], ModernDetailsListState.prototype, "currentFilterPanelValues", null);
    __decorate([
        mobx_1.computed
    ], ModernDetailsListState.prototype, "listItems", null);
    __decorate([
        mobx_1.computed
    ], ModernDetailsListState.prototype, "columns", null);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "onDismissViewItemPanel", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "contextualMenuDismissed", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "clearFilter", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "onFilterApplied", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "filterDismissed", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "changeFilter", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "changeSort", void 0);
    __decorate([
        mobx_1.action
    ], ModernDetailsListState.prototype, "columnClick", void 0);
    return ModernDetailsListState;
}(ModernState_1.default));
exports.default = ModernDetailsListState;
//# sourceMappingURL=ModernDetailsListState.js.map