import { observable, action, computed, toJS } from "mobx";
import { IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { IModernField, ModernFieldType, IModernFilter, IModernSort } from "../../Modern.Types";
import { IContextualMenuItem, ContextualMenuItemType, DirectionalHint } from "office-ui-fabric-react/lib/ContextualMenu";
import { Subscription, from } from "rxjs";
import ModernState from "../../utilities/ModernState";

export default class ModernDetailsListState extends ModernState {


    @observable
    private columnHeaderField: any;

    @observable
    public items: any[];

    @observable
    public hasNextPage: boolean;

    @observable
    public currentFilterField: IModernField;

    @observable
    public currentFilters: IModernFilter[] = [];

    @observable
    public viewName: string;

    @observable
    public fields: IModernField[];

    @observable
    public sorting: IModernSort;

    @observable
    public currentViewItem: any;

    @observable
    public selectedItems: any[] = [];

    private sortSubscription: Subscription;

    @computed
    get loadingText() {
        if (this.viewName) {
            return this.strings.formatString(this.strings.loadingView, this.viewName);
        }

        return this.strings.loading;
    }



    @computed
    get contextualHeaderMenuProps() {
        if (this.columnHeaderField) {

            const column = this.columns.find(t => t.key == this.columnHeaderField.column);

            if (column && column.columnActionsMode !== ColumnActionsMode.disabled) {

                const field: IModernField = this.fields.find(h => h.key == column.key);

                let items: IContextualMenuItem[] = [];

                if (field.sortable) {
                    switch (field.type) {
                        case ModernFieldType.text:
                        case ModernFieldType.lookup:
                        case ModernFieldType.email:
                        case ModernFieldType.phone:
                        case ModernFieldType.login:
                        case ModernFieldType.managedMetadata:
                        case ModernFieldType.user:
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
                        case ModernFieldType.dateTime:
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
                            itemType: ContextualMenuItemType.Divider
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
                    directionalHint: DirectionalHint.bottomLeftEdge,
                    gapSpace: 10,
                    isBeakVisible: true,
                    onDismiss: this.contextualMenuDismissed
                };

            }
        }

        return null;
    }


    @computed
    get currentFilterPanelValues() {
        if (this.currentFilters && this.currentFilterField) {

            const filter = this.currentFilters.find(t => t.field == this.currentFilterField.key);

            if (filter) {
                return toJS(filter.values);
            }
        }

        return [];
    }

    @computed
    get listItems() {

        if (this.items) {
            let items = toJS(this.items);

            if (this.hasNextPage) {
                items.push(null);
            }

            return items;
        }

        return null;
    }

    @computed
    get columns(): IColumn[] {

        return this.fields.map(field => {
            return {
                key: field.key,
                name: field.name,
                minWidth: 30,
                columnActionsMode: ((field.sortable || field.filterable) ? ColumnActionsMode.clickable : ColumnActionsMode.disabled),
                isSorted: this.sorting && this.sorting.field == field.key ? true : false,
                isSortedDescending: this.sorting && this.sorting.field == field.key && !this.sorting.ascending ? true : false,
                isFiltered: this.currentFilters.findIndex(g => g.field == field.key) > -1,
                maxWidth: (field.type == ModernFieldType.image || field.type == ModernFieldType.boolean || field.type == ModernFieldType.number
                    || field.type == ModernFieldType.percent || field.type == ModernFieldType.currency || (field.type == ModernFieldType.url && field.icon)) ? 50 : 150,
                fieldName: field.key
            };
        });
    }

    constructor(items, currentViewItem, hasNextPage, fields, viewName, protected onSelectionChangedEvent, protected onSortChangedEvent, private onFilterChangedEvent, language) {
        super(language);

        this.items = items;
        this.fields = fields;
        this.hasNextPage = hasNextPage;
        this.viewName = viewName;
        this.currentViewItem = currentViewItem;
    }


    @action
    public onDismissViewItemPanel = () => {

        this.currentViewItem = null;
    }

    @action
    public contextualMenuDismissed = () => {
        this.columnHeaderField = null;
    }


    @action
    public clearFilter = (fieldId) => {
        from(this.onFilterApplied(fieldId, null)).subscribe();
    }

    @action
    public onFilterApplied = (field, values) => {

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

        return from(this.onFilterChangedEvent(toJS(this.currentFilters))).toPromise();
    }

    @action
    public filterDismissed = () => {
        this.currentFilterField = null;
    }

    @action
    public changeFilter = (column) => {
        this.currentFilterField = this.fields.find(f => f.key == column);
    }

    @action
    public changeSort = (column, ascending) => {
        this.sorting = {
            field: column,
            ascending: ascending
        };

        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }

        this.sortSubscription = from(this.onSortChangedEvent(column, ascending)).subscribe();
    }


    @action
    public columnClick = (ev: any, column: IColumn) => {
        this.columnHeaderField = {
            column: column.key,
            element: ev.currentTarget
        };


    }

}