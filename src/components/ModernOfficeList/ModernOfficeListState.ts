import { observable, action, computed, toJS } from "mobx";
import locales from "../../utilities/locales";
import { from, concat, Observable, pipe, interval, of, merge } from 'rxjs';
import { map, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { IModernView } from "../../Modern.Types";

export default class ModernOfficeListState {

    @observable
    private locale: any;

    @observable
    public newItem: any;

    @observable
    public views: IModernView[];

    @observable
    public items: any[];

    @observable
    public currentViewId: string;

    @observable
    private selectedItems: any[];

    @observable
    public newItemFormVisible: boolean;

    @observable
    public confirmDeleteDialogVisible: boolean;

    constructor(items, views, newItemFields, protected onSearchEvent, protected onViewChangeEvent, protected onNewItemEvent, protected onSaveNewItemEvent,
        protected onDeleteItemEvent,
        defaultViewId = null, language = null) {
        this.locale = new locales(language);
     
        this.items = items;
        this.currentViewId = defaultViewId;
        this.views = views;

    }
   

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
    get currentView() {
        return this.views.find(a => a.key == this.currentViewId);
    }

    @action
    public onSaveNewItem = (item) => {
        return from(this.onSaveNewItemEvent(item))
            .pipe(map(y => {
                this.newItemFormVisible = false;
            }), switchMap(() => from(this.onViewChange(this.currentViewId)))).toPromise();
    }

    @action
    public onDelete = () => {
        this.confirmDeleteDialogVisible = true;
        //this.newItemFormVisible = false;
    }

    @action
    public onDeleteConfirmed = () => {
        this.confirmDeleteDialogVisible = false;

        var dsds = this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))));
        concat(dsds).subscribe();

     //   concatMap(c => from(this.selectedItems.map(c => from(this.onDeleteItemEvent(toJS(c))))));
        //.subscribe(res => console.log("sasasa" + res));;
        //concat(ddas).subscribe(res => console.log("sasasa" + res));
       // this.onDeleteItemEvent()
        //var deleteItems = 
        //this.newItemFormVisible = false;
    }

    @action
    public onDeleteCanceled = () => {
        this.confirmDeleteDialogVisible = false;
        //this.newItemFormVisible = false;
    }

    @action
    public onNewItemDismissed = () => {
        this.newItemFormVisible = false;
    }

    @action
    public onNewItemClicked = () => {
        this.newItemFormVisible = true;

        from(this.onNewItemEvent())
            .pipe(map(y => {
                this.newItem = y;
            })).subscribe();
    }

    @action
    public onSelectionChanged = (selectedItems) => {
        this.selectedItems = selectedItems;
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
        this.items = null;

        from(this.onSearchEvent(search))
            .pipe(map((y: any) => {
                //    this.newItem = y;
                this.items = y;
            })).subscribe();
    }

  
}