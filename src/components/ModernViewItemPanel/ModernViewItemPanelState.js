"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Modern_Types_1 = require("../../Modern.Types");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModernState_1 = require("../../utilities/ModernState");
var ModernViewItemPanelState = /** @class */ (function (_super) {
    __extends(ModernViewItemPanelState, _super);
    function ModernViewItemPanelState(item, actions, groups, hideDelete, onDismissEvent, onUpdateItemEvent, onDeleteItemEvent, onGetItem, onActionClickedEvent, getNewActionFieldsEvent, getNewActionItemEvent, onSaveActionItemEvent, language) {
        var _this = _super.call(this, language) || this;
        _this.onDismissEvent = onDismissEvent;
        _this.onUpdateItemEvent = onUpdateItemEvent;
        _this.onDeleteItemEvent = onDeleteItemEvent;
        _this.onGetItem = onGetItem;
        _this.onActionClickedEvent = onActionClickedEvent;
        _this.getNewActionFieldsEvent = getNewActionFieldsEvent;
        _this.getNewActionItemEvent = getNewActionItemEvent;
        _this.onSaveActionItemEvent = onSaveActionItemEvent;
        _this.onDismiss = function () {
            _this.item = null;
            _this.showEmbeddedFieldId = null;
            _this.onDismissEvent();
        };
        _this.onDismissEditForm = function () {
            _this.editItem = null;
            _this.editGroup = null;
        };
        _this.getItem = function () {
            if (_this.item && _this.onGetItem) {
                _this.isLoading = true;
                rxjs_1.from(_this.onGetItem(_this.item)).pipe(operators_1.map(function (g) {
                    _this.item = g;
                    _this.isLoading = false;
                })).subscribe();
            }
        };
        _this.onDeleteConfirmed = function () {
            _this.showDeleteConfirmation = false;
            rxjs_1.from(_this.onDeleteItemEvent(_this.item)).pipe(operators_1.map(function (b) {
                //    this.item = null;
                // this.item = item;
                // this.onDismissEditForm();
                //this.editGroup = null;
                //this.editItem = null;
            })).subscribe();
        };
        _this.onDeleteCanceled = function () {
            _this.showDeleteConfirmation = false;
        };
        _this.onUpdateItem = function (item) {
            return rxjs_1.from(_this.onUpdateItemEvent(item)).pipe(operators_1.map(function (b) {
                _this.item = item;
                _this.onDismissEditForm();
                //this.editGroup = null;
                //this.editItem = null;
            })).toPromise();
        };
        _this.onEditClicked = function (groupId) {
            //  console.log(groupId);
            _this.editItem = mobx_1.toJS(_this.item);
            _this.editGroup = groupId;
        };
        _this.onMoreClicked = function (fieldId) {
            console.log(fieldId);
            _this.showEmbeddedFieldId = fieldId;
        };
        //@action
        //public onBackClicked = () => {
        //    this.showEmbeddedFieldId = null;
        //}
        _this.onActionClicked = function (id) {
            console.log(id);
            _this.onActionClickedEvent(id);
        };
        _this.onSaveNewActionItem = function (item) {
            return rxjs_1.from(_this.onSaveActionItemEvent(item)).pipe(operators_1.map(function (o) {
                _this.newActionItemFormVisible = false;
                if (_this.redirectUrl) {
                    _this.requestRedirect = true;
                }
            })).toPromise();
        };
        _this.cancelRedirect = function () {
            _this.requestRedirect = false;
        };
        _this.onNewActionItemDismiss = function () {
            _this.newActionItemFormVisible = false;
        };
        _this.onPanelActionClicked = function (id) {
            console.log(id);
            switch (id) {
                case "Delete":
                    _this.showDeleteConfirmation = true;
                    break;
                case "Back":
                    _this.showEmbeddedFieldId = null;
                    break;
                default:
                    var act = _this.itemActions.find(function (g) { return g.key == id; });
                    switch (act.type) {
                        case Modern_Types_1.ModernActionType.form:
                            _this.newActionItemFormVisible = true;
                            _this.redirectUrl = act.redirectUrl;
                            rxjs_1.zip(rxjs_1.from(_this.getNewActionFieldsEvent(mobx_1.action)), rxjs_1.from(_this.getNewActionItemEvent(mobx_1.action))).pipe(operators_1.map(function (g) {
                                _this.newActionFields = g[0];
                                _this.newActionItem = g[1];
                            })).subscribe();
                            break;
                        case Modern_Types_1.ModernActionType.custom:
                            _this.onActionClickedEvent(id);
                            break;
                    }
                    break;
            }
        };
        _this.item = item;
        _this.groups = groups;
        _this.hideDelete = hideDelete;
        _this.actions = actions;
        return _this;
    }
    Object.defineProperty(ModernViewItemPanelState.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        set: function (val) {
            this._groups = val.map(function (o) {
                //   o.fields = o.fields.filter(a => !a.hideInViewForm);
                if (o.fields.length > 0 && o.fields.filter(function (a) { return a.editGroupTrigger; }).length == 0 && o.fields.filter(function (a) { return !a.readOnly; }).length > 0) {
                    var field = o.fields.find(function (f) { return !f.action && !f.embeddedFields; });
                    if (field != null) {
                        field.editGroupTrigger = true;
                    }
                }
                return o;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "itemActions", {
        get: function () {
            if (this.isLoading) {
                return [];
            }
            var actions = [];
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "itemGroups", {
        //@computed
        //get viewGroups(): IModernFieldGroup[] {
        //    return this.itemGroups.map(o => {
        //        o.fields = o.fields.filter(a => !a.hideInViewForm);
        //        return o;
        //    });
        //}
        get: function () {
            var _this = this;
            if (!this.groups) {
                return [];
            }
            if (!this.showEmbeddedFieldId) {
                return this.groups.map(function (o) {
                    return {
                        id: o.id,
                        description: o.description,
                        fields: o.fields.filter(function (a) { return !a.hideInViewForm; })
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
            var field = this.fields.find(function (f) { return f.key == _this.showEmbeddedFieldId; });
            return [{
                    id: field.key,
                    description: "",
                    fields: field.embeddedFields.filter(function (a) { return !a.hideInViewForm; })
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "fields", {
        get: function () {
            var fields = [];
            if (this.groups && this.groups.length > 0) {
                this.groups.forEach(function (a) {
                    fields = fields.concat(a.fields);
                });
                // return this.groups[this.step].fields;
            }
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "isLoaded", {
        get: function () {
            return this.groups != null && this.item != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "editFields", {
        get: function () {
            var _this = this;
            if (this.editGroup) {
                return this.groups.find(function (g) { return g.id == _this.editGroup; }).fields.filter(function (g) { return !g.readOnly; });
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModernViewItemPanelState.prototype, "editGroupTitle", {
        get: function () {
            var _this = this;
            if (this.editGroup) {
                return this.groups.find(function (a) { return a.id == _this.editGroup; }).description;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
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
    return ModernViewItemPanelState;
}(ModernState_1.default));
exports.default = ModernViewItemPanelState;
//# sourceMappingURL=ModernViewItemPanelState.js.map