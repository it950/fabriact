"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const Modern_Types_1 = require("../../Modern.Types");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const rxjs_1 = require("rxjs");
const ModernState_1 = require("../../utilities/ModernState");
class ModernDetailsListState extends ModernState_1.default {
    constructor(items, currentViewItem, hasNextPage, fields, viewName, onSelectionChangedEvent, onSortChangedEvent, onFilterChangedEvent, language) {
        super(language);
        this.onSelectionChangedEvent = onSelectionChangedEvent;
        this.onSortChangedEvent = onSortChangedEvent;
        this.onFilterChangedEvent = onFilterChangedEvent;
        this.currentFilters = [];
        this.selectedItems = [];
        this.onDismissViewItemPanel = () => {
            this.currentViewItem = null;
        };
        this.contextualMenuDismissed = () => {
            this.columnHeaderField = null;
        };
        this.clearFilter = (fieldId) => {
            rxjs_1.from(this.onFilterApplied(fieldId, null)).subscribe();
        };
        this.onFilterApplied = (field, values) => {
            this.currentFilterField = null;
            if (values && values.length > 0) {
                var filter = this.currentFilters.find(t => t.field == field);
                if (filter) {
                    filter.values = values;
                }
                else {
                    this.currentFilters.push({
                        field: field,
                        values: values
                    });
                }
            }
            else {
                this.currentFilters = this.currentFilters.filter(t => t.field != field);
            }
            return rxjs_1.from(this.onFilterChangedEvent(mobx_1.toJS(this.currentFilters))).toPromise();
        };
        this.filterDismissed = () => {
            this.currentFilterField = null;
        };
        this.changeFilter = (column) => {
            this.currentFilterField = this.fields.find(f => f.key == column);
        };
        this.changeSort = (column, ascending) => {
            this.sorting = {
                field: column,
                ascending: ascending
            };
            if (this.sortSubscription) {
                this.sortSubscription.unsubscribe();
            }
            this.sortSubscription = rxjs_1.from(this.onSortChangedEvent(column, ascending)).subscribe();
        };
        this.columnClick = (ev, column) => {
            this.columnHeaderField = {
                column: column.key,
                element: ev.currentTarget
            };
        };
        this.items = items;
        this.fields = fields;
        this.hasNextPage = hasNextPage;
        this.viewName = viewName;
        this.currentViewItem = currentViewItem;
    }
    get loadingText() {
        if (this.viewName) {
            return this.strings.formatString(this.strings.loadingView, this.viewName);
        }
        return this.strings.loading;
    }
    get contextualHeaderMenuProps() {
        if (this.columnHeaderField) {
            const column = this.columns.find(t => t.key == this.columnHeaderField.column);
            if (column && column.columnActionsMode !== DetailsList_1.ColumnActionsMode.disabled) {
                const field = this.fields.find(h => h.key == column.key);
                let items = [];
                if (field.sortable) {
                    switch (field.type) {
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
                                    checked: column.isSorted && !column.isSortedDescending,
                                    onClick: () => this.changeSort(column.key, true)
                                },
                                {
                                    key: 'zToA',
                                    name: this.strings.sortOnTextDescending,
                                    canCheck: true,
                                    checked: column.isSorted && column.isSortedDescending,
                                    onClick: () => this.changeSort(column.key, false)
                                },
                            ];
                            break;
                        case Modern_Types_1.ModernFieldType.dateTime:
                            items = [
                                {
                                    key: 'oToN',
                                    name: this.strings.sortOnDateAscending,
                                    canCheck: true,
                                    checked: column.isSorted && !column.isSortedDescending,
                                    onClick: () => this.changeSort(column.key, true)
                                },
                                {
                                    key: 'nToO',
                                    name: this.strings.sortOnDateDescending,
                                    canCheck: true,
                                    checked: column.isSorted && column.isSortedDescending,
                                    onClick: () => this.changeSort(column.key, false)
                                }
                            ];
                            break;
                        default:
                            break;
                    }
                }
                if (field.filterable) {
                    if (items.length > 0) {
                        items.push({
                            key: 'divider_1',
                            itemType: ContextualMenu_1.ContextualMenuItemType.Divider
                        });
                    }
                    const currentFilters = this.currentFilters.find(g => g.field == field.key);
                    items.push({
                        key: 'filter',
                        name: currentFilters != null && currentFilters.values.length > 0
                            ? `${this.strings.filterBy} (${currentFilters.values.length})` : this.strings.filterBy,
                        //    name: (current.length == 0 ? `${this.root.strings.FilterBy}` : `${this.root.strings.FilterBy} (${current.length})`),
                        canCheck: false,
                        onClick: () => this.changeFilter(column.key)
                    });
                    if (currentFilters && currentFilters.values.length > 0) {
                        items.push({
                            key: 'clearfilters',
                            name: this.strings.clearFilters,
                            canCheck: false,
                            onClick: () => this.clearFilter(column.key)
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
    }
    get currentFilterPanelValues() {
        if (this.currentFilters && this.currentFilterField) {
            const filter = this.currentFilters.find(t => t.field == this.currentFilterField.key);
            if (filter) {
                return mobx_1.toJS(filter.values);
            }
        }
        return [];
    }
    get listItems() {
        if (this.items) {
            let items = mobx_1.toJS(this.items);
            if (this.hasNextPage) {
                items.push(null);
            }
            return items;
        }
        return null;
    }
    get columns() {
        return this.fields.map(field => {
            return {
                key: field.key,
                name: field.name,
                minWidth: 30,
                columnActionsMode: ((field.sortable || field.filterable) ? DetailsList_1.ColumnActionsMode.clickable : DetailsList_1.ColumnActionsMode.disabled),
                isSorted: this.sorting && this.sorting.field == field.key ? true : false,
                isSortedDescending: this.sorting && this.sorting.field == field.key && !this.sorting.ascending ? true : false,
                isFiltered: this.currentFilters.findIndex(g => g.field == field.key) > -1,
                maxWidth: (field.type == Modern_Types_1.ModernFieldType.image || field.type == Modern_Types_1.ModernFieldType.boolean || field.type == Modern_Types_1.ModernFieldType.number || field.type == Modern_Types_1.ModernFieldType.calculated
                    || field.type == Modern_Types_1.ModernFieldType.percent || field.type == Modern_Types_1.ModernFieldType.currency || (field.type == Modern_Types_1.ModernFieldType.url && field.icon)) ? 50 : 150,
                fieldName: field.key
            };
        });
    }
}
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
exports.default = ModernDetailsListState;
//# sourceMappingURL=ModernDetailsListState.js.map