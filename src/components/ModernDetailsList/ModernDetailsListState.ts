import { observable, action, computed } from "mobx";
import { Selection, IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { IModernField, ModernFieldType } from "../../Modern.Types";

export default class ModernDetailsListState {

    public selection: Selection;

    constructor(items = null, fields = [], protected onSelectionChangedEvent = null) {
        this.items = items;
        this.fields = fields;
        this.selection = new Selection({ onSelectionChanged: this.onSelectChanged });

    }

  //  @observable
  //  selectedItems: any[];

    @observable
    items: any[];

    @observable
    fields: IModernField[];

    @observable
    pages: any[];

    @action
    public onSelectChanged = () => {
     //   this.selectedItems = this.selection.getSelection();

        this.onSelectionChangedEvent(this.selection.getSelection());
    }


    @computed
    get columns(): IColumn[] {
    //    if (this.currentView != null && this.schema != null) {
      //      var fields = this.currentView.Fields;

            //if (this.currentView.groups) {
            //  fields = fields.filter(f => this.currentView.groups.filter(d => d.fieldId == f).length == 0);
            //}

        return this.fields.map(field => {
            var dsdsa: any[];

            //   var field = this.getFieldById(a);

            //  var schema = this.root.data.getFieldById(a);
            // var filters = this.getFilterValues(schema.id);
            var column: IColumn = {
                key: field.key,
                name: field.name,
                minWidth: 30,
                columnActionsMode: ((field.sortable || field.filterable) ? ColumnActionsMode.clickable : ColumnActionsMode.disabled),
         //       isSorted: this.clientQuery.orderBy ? this.clientQuery.orderBy.field == field.Id || this.clientQuery.orderBy.field == field.FilterField : false,
            //    isSortedDescending: this.clientQuery.orderBy
           ////         && (this.clientQuery.orderBy.field == field.Id || this.clientQuery.orderBy.field == field.FilterField)
            //        && !this.clientQuery.orderBy.ascending,
                //   isFiltered: this.clientQuery.filter.find(a => a.field == field.Id) != null && this.clientQuery.filter.find(a => a.field == field.Id).values.length > 0,
                maxWidth: (field.type == ModernFieldType.image || field.type == ModernFieldType.boolean || field.type == ModernFieldType.number || field.type == ModernFieldType.calculated
                    || field.type == ModernFieldType.percent || field.type == ModernFieldType.currency || (field.type == ModernFieldType.url && field.icon)) ? 50 : 150,
                fieldName: field.key
            };

            return column;
        });
    //    }

    //    return [];
    }

    //@computed
    //get selectedItemCount() {
    //    if (this.selectedItems) {
    //        return this.selectedItems.length;
    //    }

    //    return 0;
    //}
}