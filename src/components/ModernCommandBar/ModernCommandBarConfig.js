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
class ModernCommandBarConfig {
    constructor(options) {
        this.actions = [];
        this.views = [];
        this.searchValue = "";
        this.viewType = 0;
        this.showListView = () => {
            this.viewType = 0;
        };
        this.showTileView = () => {
            this.viewType = 1;
        };
        this.clearSearch = () => {
            this.searchValue = "";
        };
        this.onSearch = (value) => {
            this.searchValue = value;
        };
        this.actions = options.actions;
        this.views = options.views;
        this.hideNew = options.hideNew;
        this.hideDelete = options.hideDelete;
        this.hideSearch = options.hideSearch;
        this.searchPlaceholder = options.searchPlaceholder;
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
    mobx_1.observable
], ModernCommandBarConfig.prototype, "actions", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "hideNew", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "hideSearch", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "searchValue", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "searchPlaceholder", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarConfig.prototype, "viewType", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarConfig.prototype, "showListView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarConfig.prototype, "showTileView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarConfig.prototype, "clearSearch", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarConfig.prototype, "onSearch", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarConfig.prototype, "items", null);
__decorate([
    mobx_1.computed
], ModernCommandBarConfig.prototype, "farItems", null);
exports.default = ModernCommandBarConfig;
//# sourceMappingURL=ModernCommandBarConfig.js.map