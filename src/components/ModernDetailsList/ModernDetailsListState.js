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
class ModernDetailsListState {
    constructor(items = null, fields = [], onSelectionChangedEvent = null) {
        this.onSelectionChangedEvent = onSelectionChangedEvent;
        this.onSelectChanged = () => {
            //   this.selectedItems = this.selection.getSelection();
            this.onSelectionChangedEvent(this.selection.getSelection());
        };
        this.items = items;
        this.fields = fields;
        this.selection = new DetailsList_1.Selection({ onSelectionChanged: this.onSelectChanged });
    }
    get columns() {
        //    if (this.currentView != null && this.schema != null) {
        //      var fields = this.currentView.Fields;
        //if (this.currentView.groups) {
        //  fields = fields.filter(f => this.currentView.groups.filter(d => d.fieldId == f).length == 0);
        //}
        return this.fields.map(field => {
            var dsdsa;
            //   var field = this.getFieldById(a);
            //  var schema = this.root.data.getFieldById(a);
            // var filters = this.getFilterValues(schema.id);
            var column = {
                key: field.key,
                name: field.name,
                minWidth: 30,
                columnActionsMode: ((field.sortable || field.filterable) ? DetailsList_1.ColumnActionsMode.clickable : DetailsList_1.ColumnActionsMode.disabled),
                //       isSorted: this.clientQuery.orderBy ? this.clientQuery.orderBy.field == field.Id || this.clientQuery.orderBy.field == field.FilterField : false,
                //    isSortedDescending: this.clientQuery.orderBy
                ////         && (this.clientQuery.orderBy.field == field.Id || this.clientQuery.orderBy.field == field.FilterField)
                //        && !this.clientQuery.orderBy.ascending,
                //   isFiltered: this.clientQuery.filter.find(a => a.field == field.Id) != null && this.clientQuery.filter.find(a => a.field == field.Id).values.length > 0,
                maxWidth: (field.type == Modern_Types_1.ModernFieldType.image || field.type == Modern_Types_1.ModernFieldType.boolean || field.type == Modern_Types_1.ModernFieldType.number || field.type == Modern_Types_1.ModernFieldType.calculated
                    || field.type == Modern_Types_1.ModernFieldType.percent || field.type == Modern_Types_1.ModernFieldType.currency || (field.type == Modern_Types_1.ModernFieldType.url && field.icon)) ? 50 : 150,
                fieldName: field.key
            };
            return column;
        });
        //    }
        //    return [];
    }
}
__decorate([
    mobx_1.observable
], ModernDetailsListState.prototype, "items", void 0);
__decorate([
    mobx_1.observable
], ModernDetailsListState.prototype, "fields", void 0);
__decorate([
    mobx_1.observable
], ModernDetailsListState.prototype, "pages", void 0);
__decorate([
    mobx_1.action
], ModernDetailsListState.prototype, "onSelectChanged", void 0);
__decorate([
    mobx_1.computed
], ModernDetailsListState.prototype, "columns", null);
exports.default = ModernDetailsListState;
//# sourceMappingURL=ModernDetailsListState.js.map