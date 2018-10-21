"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const rxjs_1 = require("rxjs");
const Modern_Types_1 = require("../../Modern.Types");
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const ModernState_1 = require("../../utilities/ModernState");
const operators_1 = require("rxjs/operators");
const Papa = require("papaparse");
const file_saver_1 = require("file-saver");
class ModernCommandBarState extends ModernState_1.default {
    constructor(views, onSearchEvent, onViewChangeEvent, onDeleteConfirmedEvent, onViewOffsetChanged, onActionClickedEvent, onExportEvent, onNewItemEvent, onSaveNewItemEvent, getNewActionFieldsEvent, getNewActionItemEvent, onSaveActionItemEvent, selectedItemCount, selectedView, hideNew, hideDelete, hideSearch, language) {
        super(language);
        this.onSearchEvent = onSearchEvent;
        this.onViewChangeEvent = onViewChangeEvent;
        this.onDeleteConfirmedEvent = onDeleteConfirmedEvent;
        this.onViewOffsetChanged = onViewOffsetChanged;
        this.onActionClickedEvent = onActionClickedEvent;
        this.onExportEvent = onExportEvent;
        this.onNewItemEvent = onNewItemEvent;
        this.onSaveNewItemEvent = onSaveNewItemEvent;
        this.getNewActionFieldsEvent = getNewActionFieldsEvent;
        this.getNewActionItemEvent = getNewActionItemEvent;
        this.onSaveActionItemEvent = onSaveActionItemEvent;
        this.views = [];
        this.viewOffset = 0;
        this.viewType = 0;
        this.onSaveNewActionItem = (item) => {
            return rxjs_1.from(this.onSaveActionItemEvent(item)).pipe(operators_1.map((o) => {
                this.newActionItemFormVisible = false;
            })).toPromise();
        };
        this.onNewActionItemDismiss = () => {
            this.newActionItemFormVisible = false;
        };
        this.onActionClicked = (action) => {
            console.log(action);
            const act = this.currentView.actions.find((g) => g.key == action);
            switch (act.type) {
                case Modern_Types_1.ModernActionType.form:
                    this.newActionItemFormVisible = true;
                    rxjs_1.zip(rxjs_1.from(this.getNewActionFieldsEvent(action)), rxjs_1.from(this.getNewActionItemEvent(action))).pipe(operators_1.map(g => {
                        this.newActionFields = g[0];
                        this.newActionItem = g[1];
                    })).subscribe();
                    break;
                case Modern_Types_1.ModernActionType.custom:
                    rxjs_1.from(this.onActionClickedEvent(action)).subscribe();
                    break;
            }
        };
        this.onSaveNewItem = (item) => {
            return rxjs_1.from(this.onSaveNewItemEvent(item))
                .pipe(operators_1.map(y => {
                this.newItemFormVisible = false;
            }), operators_1.switchMap(() => rxjs_1.from(this.onViewChangeEvent(this.currentViewKey)))).toPromise();
        };
        this.showListView = () => {
            this.viewType = 0;
        };
        this.showTileView = () => {
            this.viewType = 1;
        };
        this.onDeleteCanceled = () => {
            this.confirmDeleteDialogVisible = false;
        };
        this.onDeleteConfirmed = () => {
            this.confirmDeleteDialogVisible = false;
            rxjs_1.from(this.onDeleteConfirmedEvent()).subscribe();
        };
        this.onDelete = () => {
            this.confirmDeleteDialogVisible = true;
        };
        this.onExport = () => {
            rxjs_1.from(this.onExportEvent()).pipe(operators_1.map(i => {
                const unparse = Papa.unparse(i, {
                    quotes: false,
                    quoteChar: '"',
                    escapeChar: '"',
                    delimiter: ";",
                    header: true,
                    newline: "\r\n"
                });
                file_saver_1.saveAs(new Blob([unparse], { type: "text/csv;charset=utf-8" }), `${this.currentViewName}_${new Date().toString()}.csv`);
            })).subscribe();
            //  this.onDeleteClickedEvent();
        };
        this.nextOffset = () => {
            this.viewOffset++;
            this.offsetChange();
        };
        this.offsetChange = () => {
            if (this.offsetSubscription) {
                this.offsetSubscription.unsubscribe();
            }
            this.offsetSubscription = rxjs_1.from(this.onViewOffsetChanged(this.viewOffset)).subscribe();
        };
        this.previousOffset = () => {
            this.viewOffset--;
            this.offsetChange();
        };
        this.viewClicked = (viewKey) => {
            if (viewKey != this.currentViewKey) {
                this.currentViewKey = viewKey;
                if (this.viewSubscription) {
                    this.viewSubscription.unsubscribe();
                }
                this.viewSubscription = rxjs_1.from(this.onViewChangeEvent(viewKey)).subscribe();
            }
        };
        this.onNewItemDismissed = () => {
            this.newItemFormVisible = false;
        };
        this.onNewItemClicked = () => {
            this.newItemFormVisible = true;
            rxjs_1.from(this.onNewItemEvent())
                .pipe(operators_1.map(y => {
                this.newItem = y;
            })).subscribe();
        };
        this.hideDelete = hideDelete;
        this.hideSearch = hideSearch;
        this.hideNew = hideNew;
        this.views = views;
        this.currentViewKey = selectedView;
        this.selectedItemCount = selectedItemCount;
    }
    get currentViewName() {
        if (this.currentView) {
            return this.currentView.name;
        }
        return null;
    }
    get currentView() {
        if (this.views && this.currentViewKey) {
            return this.views.find(f => f.key == this.currentViewKey);
        }
        return null;
    }
    get items() {
        let result = this.currentView && this.currentView.actions ? this.currentView.actions
            .filter((g) => g.selectionMode == DetailsList_1.SelectionMode.none && this.selectedItemCount == 0
            || g.selectionMode == DetailsList_1.SelectionMode.single && this.selectedItemCount == 1
            || g.selectionMode == DetailsList_1.SelectionMode.multiple && this.selectedItemCount > 0)
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
        if (this.currentView && this.currentView.isDynamicView) {
            menu.unshift({
                key: 'previousMonth',
                icon: 'ChevronLeft',
                isSubMenu: false,
                onClick: this.previousOffset
            });
            menu.push({
                key: 'nextMonth',
                icon: 'ChevronRight',
                isSubMenu: false,
                onClick: this.nextOffset
            });
        }
        return menu;
    }
}
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "selectedItemCount", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "newItem", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "newItemFormVisible", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "views", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "hideNew", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "viewOffset", void 0);
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
    mobx_1.observable
], ModernCommandBarState.prototype, "confirmDeleteDialogVisible", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "viewType", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "newActionItemFormVisible", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "newActionItem", void 0);
__decorate([
    mobx_1.observable
], ModernCommandBarState.prototype, "newActionFields", void 0);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "currentViewName", null);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "currentView", null);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "items", null);
__decorate([
    mobx_1.computed
], ModernCommandBarState.prototype, "farItems", null);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onSaveNewActionItem", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onNewActionItemDismiss", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onActionClicked", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onSaveNewItem", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "showListView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "showTileView", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onDeleteCanceled", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onDeleteConfirmed", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onDelete", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onExport", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "nextOffset", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "offsetChange", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "previousOffset", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "viewClicked", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onNewItemDismissed", void 0);
__decorate([
    mobx_1.action
], ModernCommandBarState.prototype, "onNewItemClicked", void 0);
exports.default = ModernCommandBarState;
//# sourceMappingURL=ModernCommandBarState.js.map