"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const Modern_Types_1 = require("../../Modern.Types");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ModernState_1 = require("../../utilities/ModernState");
class ModernViewItemPanelState extends ModernState_1.default {
    constructor(item, actions, groups, hideDelete, onDismissEvent, onUpdateItemEvent, onDeleteItemEvent, onGetItem, onActionClickedEvent, getNewActionFieldsEvent, getNewActionItemEvent, onSaveActionItemEvent, language) {
        super(language);
        this.onDismissEvent = onDismissEvent;
        this.onUpdateItemEvent = onUpdateItemEvent;
        this.onDeleteItemEvent = onDeleteItemEvent;
        this.onGetItem = onGetItem;
        this.onActionClickedEvent = onActionClickedEvent;
        this.getNewActionFieldsEvent = getNewActionFieldsEvent;
        this.getNewActionItemEvent = getNewActionItemEvent;
        this.onSaveActionItemEvent = onSaveActionItemEvent;
        this.onDismiss = () => {
            this.item = null;
            this.showEmbeddedFieldId = null;
            this.onDismissEvent();
        };
        this.onDismissEditForm = () => {
            this.editItem = null;
            this.editGroup = null;
        };
        this.getItem = () => {
            if (this.item && this.onGetItem) {
                this.isLoading = true;
                rxjs_1.from(this.onGetItem(this.item)).pipe(operators_1.map(g => {
                    this.item = g;
                    this.isLoading = false;
                })).subscribe();
            }
        };
        this.onDeleteConfirmed = () => {
            this.showDeleteConfirmation = false;
            rxjs_1.from(this.onDeleteItemEvent(this.item)).pipe(operators_1.map(b => {
                //    this.item = null;
                // this.item = item;
                // this.onDismissEditForm();
                //this.editGroup = null;
                //this.editItem = null;
            })).subscribe();
        };
        this.onDeleteCanceled = () => {
            this.showDeleteConfirmation = false;
        };
        this.onUpdateItem = (item) => {
            return rxjs_1.from(this.onUpdateItemEvent(item)).pipe(operators_1.map(b => {
                this.item = item;
                this.onDismissEditForm();
                //this.editGroup = null;
                //this.editItem = null;
            })).toPromise();
        };
        this.onEditClicked = (groupId) => {
            //  console.log(groupId);
            this.editItem = mobx_1.toJS(this.item);
            this.editGroup = groupId;
        };
        this.onMoreClicked = (fieldId) => {
            console.log(fieldId);
            this.showEmbeddedFieldId = fieldId;
        };
        //@action
        //public onBackClicked = () => {
        //    this.showEmbeddedFieldId = null;
        //}
        this.onActionClicked = (id) => {
            console.log(id);
            this.onActionClickedEvent(id);
        };
        this.onSaveNewActionItem = (item) => {
            return rxjs_1.from(this.onSaveActionItemEvent(item)).pipe(operators_1.map((o) => {
                this.newActionItemFormVisible = false;
                if (this.redirectUrl) {
                    this.requestRedirect = true;
                }
            })).toPromise();
        };
        this.cancelRedirect = () => {
            this.requestRedirect = false;
        };
        this.onNewActionItemDismiss = () => {
            this.newActionItemFormVisible = false;
        };
        this.onPanelActionClicked = (id) => {
            console.log(id);
            switch (id) {
                case "Delete":
                    this.showDeleteConfirmation = true;
                    break;
                case "Back":
                    this.showEmbeddedFieldId = null;
                    break;
                default:
                    const act = this.itemActions.find((g) => g.key == id);
                    switch (act.type) {
                        case Modern_Types_1.ModernActionType.form:
                            this.newActionItemFormVisible = true;
                            this.redirectUrl = act.redirectUrl;
                            rxjs_1.zip(rxjs_1.from(this.getNewActionFieldsEvent(mobx_1.action)), rxjs_1.from(this.getNewActionItemEvent(mobx_1.action))).pipe(operators_1.map(g => {
                                this.newActionFields = g[0];
                                this.newActionItem = g[1];
                            })).subscribe();
                            break;
                        case Modern_Types_1.ModernActionType.custom:
                            this.onActionClickedEvent(id);
                            break;
                    }
                    break;
            }
        };
        this.item = item;
        this.groups = groups;
        this.hideDelete = hideDelete;
        this.actions = actions;
    }
    get groups() {
        return this._groups;
    }
    set groups(val) {
        this._groups = val.map(o => {
            //   o.fields = o.fields.filter(a => !a.hideInViewForm);
            if (o.fields.length > 0 && o.fields.filter(a => a.editGroupTrigger).length == 0 && o.fields.filter(a => !a.readOnly).length > 0) {
                var field = o.fields.find(f => !f.action && !f.embeddedFields);
                if (field != null) {
                    field.editGroupTrigger = true;
                }
            }
            return o;
        });
    }
    get itemActions() {
        if (this.isLoading) {
            return [];
        }
        let actions = [];
        if (!this.showEmbeddedFieldId) {
            if (this.actions) {
                actions = actions.concat(this.actions);
            }
            if (!this.hideDelete) {
                actions.push({
                    key: "Delete", type: Modern_Types_1.ModernActionType.custom, icon: "Delete", name: !this.actions || this.actions.length == 0 ?
                        this.strings.delete : null
                });
            }
        }
        else {
            actions.push({ key: "Back", type: Modern_Types_1.ModernActionType.custom, icon: "Back", name: this.strings.back });
        }
        return actions;
    }
    //@computed
    //get viewGroups(): IModernFieldGroup[] {
    //    return this.itemGroups.map(o => {
    //        o.fields = o.fields.filter(a => !a.hideInViewForm);
    //        return o;
    //    });
    //}
    get itemGroups() {
        if (!this.groups) {
            return [];
        }
        if (!this.showEmbeddedFieldId) {
            return this.groups.map(o => {
                return {
                    id: o.id,
                    description: o.description,
                    fields: o.fields.filter(a => !a.hideInViewForm)
                };
                //  o.fields = o.fields.filter(a => !a.hideInViewForm);
                //if (o.fields.length > 0 && o.fields.filter(a => a.editGroupTrigger).length == 0 && o.fields.filter(a => !a.readOnly).length > 0) {
                //    var field = o.fields.find(f => !f.action && !f.embeddedFields);
                //    if (field != null) {
                //        field.editGroupTrigger = true;
                //    }
                //} 
                //   return o;
            });
        }
        var field = this.fields.find(f => f.key == this.showEmbeddedFieldId);
        return [{
                id: field.key,
                description: "",
                fields: field.embeddedFields.filter(a => !a.hideInViewForm)
            }];
    }
    get fields() {
        let fields = [];
        if (this.groups && this.groups.length > 0) {
            this.groups.forEach(a => {
                fields = fields.concat(a.fields);
            });
            // return this.groups[this.step].fields;
        }
        return fields;
    }
    get isLoaded() {
        return this.groups != null && this.item != null;
    }
    get editFields() {
        if (this.editGroup) {
            return this.groups.find(g => g.id == this.editGroup).fields.filter(g => !g.readOnly);
        }
        return [];
    }
    get editGroupTitle() {
        if (this.editGroup) {
            return this.groups.find(a => a.id == this.editGroup).description;
        }
        return null;
    }
}
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "hideDelete", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "showDeleteConfirmation", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "editGroup", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "actions", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "editItem", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "isSaving", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "isLoading", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "isValid", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "showEmbeddedFieldId", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "_groups", void 0);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "groups", null);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "forceValidation", void 0);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "itemActions", null);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "itemGroups", null);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "fields", null);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "isLoaded", null);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "editFields", null);
__decorate([
    mobx_1.computed
], ModernViewItemPanelState.prototype, "editGroupTitle", null);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onDismiss", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onDismissEditForm", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "getItem", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onDeleteConfirmed", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onDeleteCanceled", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onUpdateItem", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onEditClicked", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onMoreClicked", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onActionClicked", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "newActionItemFormVisible", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "newActionFields", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "newActionItem", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "requestRedirect", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemPanelState.prototype, "redirectUrl", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onSaveNewActionItem", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "cancelRedirect", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onNewActionItemDismiss", void 0);
__decorate([
    mobx_1.action
], ModernViewItemPanelState.prototype, "onPanelActionClicked", void 0);
exports.default = ModernViewItemPanelState;
//# sourceMappingURL=ModernViewItemPanelState.js.map