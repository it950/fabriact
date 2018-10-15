import { observable, computed, action } from "mobx";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import locales from "../../utilities/locales";
import { from } from "rxjs";
import { map } from "rxjs/operators";

export default class ModernCommandBarState {

    @observable
    private locale: any;

    constructor(actions = [], views = [], protected onNewClickedEvent, protected onSearchEvent, protected onViewChangeEvent,
        protected onDeleteClickedEvent,
        selectedView = null, hideNew = false, hideDelete = false, hideSearch = false, language = null) {

        this.locale = new locales(language);

        this.actions = actions;
        this.hideDelete = hideDelete;
        this.hideSearch = hideSearch;
        this.hideNew = hideNew;
        this.views = views;
        this.currentViewKey = selectedView;
       
    }


    @computed
    get searchPlaceholder() {
        return this.strings.searchPlaceholder;
    }

    @computed
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }

        return {
        };
    }


    @observable
    public actions: any[] = [];

    @observable
    public views: any[] = [];

    @observable
    public hideNew: boolean;

    @observable
    public hideDelete: boolean;

    @observable
    public hideSearch: boolean;

    @observable
    public currentViewKey: string;

    @computed
    get currentViewName() {
        if (this.views && this.currentViewKey) {
            return this.views.find(f => f.key == this.currentViewKey).name;
        }

        return null;
    }

    @observable
    public searchValue: string = "";

    @observable
    public viewType: number = 0;

    @action
    private showListView = () => {
        this.viewType = 0;
    }

    @action
    private showTileView = () => {
        this.viewType = 1;
    }


    @action
    public clearSearch = () => {
        this.searchValue = "";
    }

    @action
    public onSearch = (value) => {
        this.searchValue = value;

        this.onSearchEvent(value);
    }

    @action
    public onDelete = () => {
    //    this.searchValue = value;

        this.onDeleteClickedEvent();
    }

    @action
    public newClicked = () => {
        this.onNewClickedEvent();
    }

    @action
    public viewClicked = (viewKey) => {
        if (viewKey != this.currentViewKey) {
            this.currentViewKey = viewKey;
            from(this.onViewChangeEvent(viewKey)).pipe(map(g => {
                
            })).subscribe();
        }
    }

    @computed
    get items() {
        let result = this.actions.map(t => {
            t.onClick = () => {
            //    this.actionClicked(t.key);
            };

            return t;
        });

        result = !this.hideNew ? [{
            key: "new",
            icon: "Add",
            name: this.strings.new,
            onClick: this.newClicked
        }].concat(result) : result;

        result = !this.hideSearch ? [{
            key: "search",
        }].concat(result) : result;

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
        var typeItems: any[] =
            [
                {
                    key: "List",
                    name: "List",
                    icon: "List",
                    canCheck: true,
                    checked: this.viewType == 0,
                    onClick: this.showListView
                },
                {
                    key: "Tiles",
                    name: "Tiles",
                    icon: "GridViewMedium",
                    canCheck: true,
                    checked: this.viewType == 1,
                    onClick: this.showTileView
                },
                {
                    key: 'divider_1',
                    itemType: ContextualMenuItemType.Divider
                }
            ];


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

        return menu;
    }

}