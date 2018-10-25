import { observable, computed, action } from "mobx";
import { from, Subscription, zip } from "rxjs";
import { IModernAction, ModernActionType } from "../../Modern.Types";
import { SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import ModernState from "../../utilities/ModernState";
import { map, switchMap } from "rxjs/operators";
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

export default class ModernCommandBarState extends ModernState {

    private viewSubscription: Subscription;
    private offsetSubscription: Subscription;

    @observable
    public selectedItemCount: number;

    @observable
    public newItem: any;

    @observable
    public newItemFormVisible: boolean;

    @observable
    public views: any[] = [];

    @observable
    public hideNew: boolean;

    @observable
    public viewOffset: number = 0;

    @observable
    public hideDelete: boolean;

    @observable
    public hideSearch: boolean;

    @observable
    public currentViewKey: string;

    @observable
    public confirmDeleteDialogVisible: boolean;  

    @observable
    public viewType: number = 0;

    @observable
    public currentActionId: string;

    @computed
    get newActionItemFormVisible() {
        return this.currentActionId != null;
    }

    @computed
    get currentAction() {
        if (this.currentActionId) {
            return this.currentView.actions.find(i => i.key == this.currentActionId);
        }

        return null;
    }

  //  @observable
  //  public newActionItemFormVisible: boolean;


    @observable
    public newActionItem: any;

    @observable
    public newActionFields: any;

    @computed
    get currentViewName() {

        if (this.currentView) {
            return this.currentView.name;
        }

        return null;
    }

    @computed
    get currentView() {
        if (this.views && this.currentViewKey) {
            return this.views.find(f => f.key == this.currentViewKey);
        }

        return null;
    }

    @computed
    get items() {
        let result = this.currentView && this.currentView.actions ? this.currentView.actions
            .filter((g: IModernAction) => g.selectionMode == SelectionMode.none && this.selectedItemCount == 0
                || g.selectionMode == SelectionMode.single && this.selectedItemCount == 1
                || g.selectionMode == SelectionMode.multiple && this.selectedItemCount > 0)
            .map(t => {
                t.onClick = () => {
                    this.onActionClicked(t.key);
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

        result = !this.hideSearch ? [{
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
    }

    @computed
    get farItems() {
        const icon = this.viewType == 0 ? 'List' : 'GridViewMedium';
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

        let typeItems = [];

        let items = typeItems.concat(this.views.map(t => {
            t.onClick = () => {
                this.viewClicked(t.key);
            };

            t.checked = this.currentViewKey == t.key;

            return t;
        }));

        let menu: any[] = [
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
            menu.unshift(
                {
                    key: 'previousMonth',
                    icon: 'ChevronLeft',
                    isSubMenu: false,
                    onClick: this.previousOffset
                });

            menu.push(
                {
                    key: 'nextMonth',
                    icon: 'ChevronRight',
                    isSubMenu: false,
                    onClick: this.nextOffset
                });


        }

        return menu;
    }

    constructor(views, protected onSearchEvent, protected onViewChangeEvent,
        protected onDeleteConfirmedEvent, protected onViewOffsetChanged, protected onActionClickedEvent, protected onExportEvent, protected onNewItemEvent,
        protected onSaveNewItemEvent, protected getNewActionFieldsEvent, protected getNewActionItemEvent, protected onSaveActionItemEvent, selectedItemCount,
        selectedView, hideNew, hideDelete, hideSearch, language) {

        super(language);

        this.hideDelete = hideDelete;
        this.hideSearch = hideSearch;
        this.hideNew = hideNew;
        this.views = views;
        this.currentViewKey = selectedView;
        this.selectedItemCount = selectedItemCount;
       
    }




    @action
    public onSaveNewActionItem = (item): Promise<void> => {
        return from(this.onSaveActionItemEvent(this.currentActionId, item)).pipe(map((o: any) => {
        //    this.newActionItemFormVisible = false;
            this.currentActionId = null;
        })).toPromise();
    }


    @action
    public onNewActionItemDismiss = () => {

        this.currentActionId = null;
    }

    @action
    public onActionClicked = (action) => {
        console.log(action);
        const act: IModernAction = this.currentView.actions.find((g: IModernAction) => g.key == action);

        switch (act.type) {
            case ModernActionType.form:
                this.currentActionId = act.key;
              //  this.newActionItemFormVisible = true;

                zip(from(this.getNewActionFieldsEvent(action)), from(this.getNewActionItemEvent(action))).pipe(map(g => {
                    this.newActionFields = g[0];
                    this.newActionItem = g[1];
                })).subscribe();

                break;
            case ModernActionType.custom:
                from(this.onActionClickedEvent(action)).subscribe();

                break;
        }


    }

    @action
    public onSaveNewItem = (item) => {
        return from(this.onSaveNewItemEvent(item))
            .pipe(map(y => {
                this.newItemFormVisible = false;
            }), switchMap(() => from(this.onViewChangeEvent(this.currentViewKey)))).toPromise();
    }

    @action
    private showListView = () => {
        this.viewType = 0;
    }

    @action
    private showTileView = () => {
        this.viewType = 1;
    }

    @action
    public onDeleteCanceled = () => {
        this.confirmDeleteDialogVisible = false;
    }

    @action
    public onDeleteConfirmed = () => {
        this.confirmDeleteDialogVisible = false;

        from(this.onDeleteConfirmedEvent()).subscribe();
    }

    @action
    public onDelete = () => {
        this.confirmDeleteDialogVisible = true;
    }

    @action
    public onExport = () => {
        from(this.onExportEvent()).pipe(map(i => {

            const unparse = Papa.unparse(i, {
                quotes: false,
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ";",
                header: true,
                newline: "\r\n"
            });

            saveAs(new Blob([unparse], { type: "text/csv;charset=utf-8" }),
                `${this.currentViewName}_${new Date().toString()}.csv`);

        })).subscribe();
      //  this.onDeleteClickedEvent();
    }


    @action
    public nextOffset = () => {
        this.viewOffset++;
        this.offsetChange();
    }


    @action
    public offsetChange = () => {
        if (this.offsetSubscription) {
            this.offsetSubscription.unsubscribe();
        }

        this.offsetSubscription = from(this.onViewOffsetChanged(this.viewOffset)).subscribe();
    }

    @action
    public previousOffset = () => {
        this.viewOffset--;
        this.offsetChange();
    }

    @action
    public viewClicked = (viewKey) => {
        if (viewKey != this.currentViewKey) {
            this.currentViewKey = viewKey;

            if (this.viewSubscription) {
                this.viewSubscription.unsubscribe();
            }

            this.viewSubscription = from(this.onViewChangeEvent(viewKey)).subscribe();
        }
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

}