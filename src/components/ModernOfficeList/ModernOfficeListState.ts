import { observable, action, computed, toJS } from "mobx";
import { from, concat, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Selection,  } from "office-ui-fabric-react/lib/DetailsList";
import { IModernView, IModernFilter } from "../../Modern.Types";
import ModernState from "../../utilities/ModernState";

export default class ModernOfficeListState extends ModernState {

    public selection: Selection;
    private viewSubscription: Subscription;

    @observable
    public searchValue: string;

    @observable
    public views: IModernView[];

    @observable
    private _items: any[];

    @computed
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;

        if (value) {
            this.selection.setItems(value, true);
        }
        
    }

    @observable
    public currentViewId: string;

    @observable
    public hasNextPage: boolean;

    @observable
    private selectedItems: any[] = [];


    @observable
    public currentViewItem: any;

    @observable
    public itemIdProperty: any;

    @observable
    public currentViewType: number = 0;

    @observable
    public hideDelete: boolean;

    @computed
    get selectedItemCount() {
        if (this.selectedItems) {
            return this.selectedItems.length;
        }

        return 0;
    }

    @computed
    get currentViews() {
        if (this.views) {
            let views = toJS(this.views);

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

    @computed
    get showDeleteButton() {
        return !this.hideDelete && this.selectedItemCount > 0;
    }

    @computed
    get viewFields() {
        if (this.currentView) {
            return this.currentView.fields;
        }

        return [];
    }

    @computed
    get actions() {
        if (this.currentView && this.currentView.actions) {
            return this.currentView.actions;
        }

        return [];
    }

    @computed
    get currentView() {
        return this.currentViews.find(a => a.key == this.currentViewId);
    }

    @computed
    get currentViewName() {
        const currentView = this.currentView;

        if (currentView) {
            return currentView.name;
        }

        return null;
    }


    constructor(items, hasNextPage, views, itemIdProperty, hideDelete,
        protected onNextPageEvent, protected onSearchEvent, protected onViewChangeEvent, protected onNewItemEvent, protected onSaveNewItemEvent,
        protected onDeleteItemEvent, protected onUpdateItemEvent, protected onViewOffsetChangeEvent, protected onSortChangedEvent, protected onFilterChangedEvent, defaultViewId, language) {
        super(language);

        this.selection = new Selection({ onSelectionChanged: this.onSelectionChanged });
     
        this.items = items;
        this.currentViewId = defaultViewId;
        this.views = views;
        this.hasNextPage = hasNextPage;
        this.itemIdProperty = itemIdProperty;
        this.hideDelete = hideDelete;

    }
   
   
    @action
    public onSortChanged = (column, ascending) => {
        this.items = null;

        return from(this.onSortChangedEvent(column, ascending))
            .pipe(map((y: any) => {
                this.items = y;
                return y;
            })).toPromise();
    }

    @action
    public onFilterChanged = (filters: IModernFilter[]) => {
        this.items = null;

        return from(this.onFilterChangedEvent(filters))
            .pipe(map((y: any) => {
                this.items = y;

                return y;
            })).toPromise();
    }

    @action
    public onUpdateItem = (item) => {
        return from(this.onUpdateItemEvent(item)).pipe(map(v => {

            let currentItem = this.items.find(g => g[this.itemIdProperty] == item[this.itemIdProperty]);

            var keys = Object.keys(item);

            keys.filter(g => g != this.itemIdProperty).forEach(k => {
                currentItem[k] = item[k];
            });

        })).toPromise();
    }

    @action
    public getNextPage = () => {
        return from(this.onNextPageEvent())
            .pipe(map((y: any) => {
                if (this.items) {
                    this.items = this.items.concat(y);
                }
            })).toPromise();

    }


    @action
    public onSelectionChanged = () => {
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

    }

    @action
    public onDeleteItem = (item) => {
        return from(this.onDeleteItemEvent(toJS(item))).pipe(map(v => {
            this.items = this.items.filter(a => a[this.itemIdProperty] != item[this.itemIdProperty]);
        })).toPromise();
    }

    @action
    public onDeleteConfirmed = () => {

        var dsds = this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))));
        return concat(dsds).toPromise();
        //.subscribe()

     //   concatMap(c => from(this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))))));
        //.subscribe(res => console.log("sasasa" + res));;
        //concat(ddas).subscribe(res => console.log("sasasa" + res));
       // this.onDeleteItemEvent()
        //var deleteItems = 
        //this.newItemFormVisible = false;
    }

   

    @action
    public onSearchCleared = () => {
        this.searchValue = null;

        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }

        this.viewSubscription = from(this.onViewChange(this.views[0].key)).subscribe();
    }

    @action
    public onViewOffsetChange = (offset) => {
        this.items = null;

        return from(this.onViewOffsetChangeEvent(offset))
            .pipe(map((y: any) => {
                this.items = y;
            })).toPromise();
    }

    @action
    public onViewChange = (key) => {
        this.items = null;
        this.currentViewId = key;

        return from(this.onViewChangeEvent(key))
            .pipe(map((y: any) => {
                this.items = y;
            })).toPromise();
    }

    @action
    public onItemSaved = () => {
     //   this.detailsListConfig.items = null;
     //   this.onViewChangeEvent(this.commandBarConfig.currentViewKey);
    }

    @action
    public onSearch = (search) => {
        this.searchValue = search;
        this.currentViewId = "search";
        this.items = null;

        return from(this.onSearchEvent(search))
            .pipe(map((y: any) => {
                this.items = y;
            })).toPromise();
    }
}