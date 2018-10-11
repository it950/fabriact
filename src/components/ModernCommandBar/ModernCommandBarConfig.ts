import { observable, computed, action } from "mobx";
import { IModernCommandBarProps } from "./IModernCommandBarProps";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { IModernCommandBarConfig } from "./IModernCommandBarConfig";

export default class ModernCommandBarConfig {

    constructor(options: IModernCommandBarConfig) {
        this.actions = options.actions;
        this.views = options.views;
        this.hideNew = options.hideNew;
        this.hideDelete = options.hideDelete;
        this.hideSearch = options.hideSearch;
        this.searchPlaceholder = options.searchPlaceholder;
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
    public searchValue: string = "";

    @observable
    public searchPlaceholder: string;

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
            name: "New",
       //     onClick: this.newClicked
        }].concat(result) : result;

        result = !this.hideSearch ? [{
            key: "search",
         //   onRender: this.renderSearch
        }].concat(result) : result;

        result = !this.hideDelete ? result.concat([{
            key: "delete",
            icon: "Delete",
            name: "Delete",
       //     onClick: this.deleteClicked
        }]) : result;
        console.log("dsadsa");
        console.log(result);
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
             //   this.actionClicked(t.key);
            };

            return t;
        }));

        let menu: any[] = [
            {
                key: 'currentView',
             //   name: this.currentViewName,
                icon: icon,
                subMenuProps: {
                    items: items,
                }
            }
        ];

        return menu;
    }

}