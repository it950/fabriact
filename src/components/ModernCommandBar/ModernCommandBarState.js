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
const locales_1 = require("../../utilities/locales");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ModernCommandBarState {
    constructor(actions = [], views = [], onNewClickedEvent, onSearchEvent, onViewChangeEvent, onDeleteClickedEvent, selectedView = null, hideNew = false, hideDelete = false, hideSearch = false, language = null) {
        this.onNewClickedEvent = onNewClickedEvent;
        this.onSearchEvent = onSearchEvent;
        this.onViewChangeEvent = onViewChangeEvent;
        this.onDeleteClickedEvent = onDeleteClickedEvent;
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
            this.onSearchEvent(value);
        };
        this.onDelete = () => {
            //    this.searchValue = value;
            this.onDeleteClickedEvent();
        };
        this.newClicked = () => {
            this.onNewClickedEvent();
        };
        this.viewClicked = (viewKey) => {
            if (viewKey != this.currentViewKey) {
                this.currentViewKey = viewKey;
                rxjs_1.from(this.onViewChangeEvent(viewKey)).pipe(operators_1.map(g => {
                })).subscribe();
            }
        };
        this.locale = new locales_1.default(language);
        this.actions = actions;
        this.hideDelete = hideDelete;
        this.hideSearch = hideSearch;
        this.hideNew = hideNew;
        this.views = views;
        this.currentViewKey = selectedView;
    }
    get searchPlaceholder() {
        return this.strings.searchPlaceholder;
    }
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }
        return {};
    }
    get currentViewName() {
        if (this.views && this.currentViewKey) {
            return this.views.find(f => f.key == this.currentViewKey).name;
        }
        return null;
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
                this.viewClicked(t.key);
            };
            t.checked = this.currentViewKey == t.key;
            return t;
        }));
        let menu = [
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
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "locale", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "searchPlaceholder", null);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "strings", null);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "actions", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "hideNew", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "hideSearch", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "currentViewKey", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "currentViewName", null);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "searchValue", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "viewType", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "showListView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "showTileView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "clearSearch", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onSearch", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onDelete", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "newClicked", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "viewClicked", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "items", null);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "farItems", null);
exports.default = ModernCommandBarState;
//# sourceMappingURL=ModernCommandBarState.js.map