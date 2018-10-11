"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
class ModernCommandBarStore {
    constructor() {
        this.actions = [];
        this.views = [];
        this.viewType = 0;
        this.showListView = () => {
            this.viewType = 0;
        };
        this.showTileView = () => {
            this.viewType = 1;
        };
    }
    init(props) {
        this.actions = props.actions;
        this.views = props.views;
        this.hideNew = props.hideNew;
        this.hideDelete = props.hideDelete;
        this.hideSearch = props.hideSearch;
        //  this.viewType = props.viewType;
    }
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
            }].concat(result) : result;
        result = !this.hideSearch ? [{
                key: "search",
            }].concat(result) : result;
        result = !this.hideDelete ? result.concat([{
                key: "delete",
                icon: "Delete",
                name: "Delete",
            }]) : result;
        console.log("dsadsa");
        console.log(result);
        return result;
    }
    get farItems() {
        const icon = this.viewType == 0 ? 'List' : 'GridViewMedium';
        var typeItems = [
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
                itemType: ContextualMenu_1.ContextualMenuItemType.Divider
            }
        ];
        let items = typeItems.concat(this.views.map(t => {
            t.onClick = () => {
                //   this.actionClicked(t.key);
            };
            return t;
        }));
        let menu = [
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
__decorate([
    mobx_1.action
], ModernCommandBarStore.prototype, "init", null);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "actions", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "hideNew", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "hideSearch", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarStore.prototype, "viewType", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarStore.prototype, "showListView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarStore.prototype, "showTileView", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarStore.prototype, "items", null);
__decorate([
    mobx_1.computed
], ModernCommandBarStore.prototype, "farItems", null);
exports.default = ModernCommandBarStore;
//# sourceMappingURL=ModernCommandBarStore.js.map