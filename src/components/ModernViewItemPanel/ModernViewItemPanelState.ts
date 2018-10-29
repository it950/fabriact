import { observable, action, computed, toJS } from "mobx";
import { IModernFieldGroup, IModernAction, ModernActionType } from "../../Modern.Types";
import { from, zip } from "rxjs";
import { map } from "rxjs/operators";
import ModernState from "../../utilities/ModernState";

export default class ModernViewItemPanelState extends ModernState {

    @observable
    public item: any;

    @observable
    public hideDelete: any;

    @observable
    public showDeleteConfirmation: boolean;

    @observable
    currentActionId: string;

    @observable
    public editGroup: string;

    @observable
    public actions: any;

    @observable
    public editItem: any;

    @observable
    public isSaving: boolean;

    @observable
    public isLoading: boolean;

    @observable
    public isValid: boolean;

    @observable
    public showEmbeddedFieldId: string;

    @observable
    public _groups: IModernFieldGroup[];


    @observable
    public newActionFields: IModernFieldGroup[];

    @observable
    public newActionItem: any;

    @observable
    public requestRedirect: boolean;

    @observable
    public redirectUrl: string;

    @computed
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

    @observable
    public forceValidation: boolean;

    @computed
    get itemActions(): IModernAction[] {
        if (this.isLoading) {
            return [];
        }

        let actions: IModernAction[] = [];

        if (!this.showEmbeddedFieldId) {

            if (this.actions) {
                actions = actions.concat(this.actions);
            }

            if (!this.hideDelete) {
                actions.push({
                    key: "Delete", type: ModernActionType.custom, icon: "Delete", name: !this.actions || this.actions.length == 0 ?
                        this.strings.delete : null
                });
            }
        }
        else {
            actions.push({ key: "Back", type: ModernActionType.custom, icon: "Back", name: this.strings.back });
        }

        return actions;
    }

    @computed
    get itemGroups(): IModernFieldGroup[] {

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
            });
        }

        var field = this.fields.find(f => f.key == this.showEmbeddedFieldId);

        return [{
            id: field.key,
            description: "",
            fields: field.embeddedFields.filter(a => !a.hideInViewForm)
        }];
    }

    @computed
    get fields() {
        let fields = [];

        if (this.groups && this.groups.length > 0) {
            this.groups.forEach(a => {
                fields = fields.concat(a.fields);
            });
        }

        return fields;
    }

    @computed
    get isLoaded() {
        return this.groups != null && this.item != null;
    }

    @computed
    get editFields() {
        if (this.editGroup) {
            return this.groups.find(g => g.id == this.editGroup).fields.filter(g => !g.readOnly);
        }

        return [];
    }

    @computed
    get editGroupTitle() {
        if (this.editGroup) {
            return this.groups.find(a => a.id == this.editGroup).description;
        }

        return null;
    }



    @computed
    get newActionItemFormVisible() {
        return this.currentActionId != null && this.currentAction.type == ModernActionType.form;
    }

    @computed
    get customActionPanelVisible() {
        return this.currentActionId != null && this.currentAction.type == ModernActionType.custom;
    }


    @computed
    get currentAction() {
        if (this.currentActionId) {
            return this.getAction(this.currentActionId);
        }

        return null;
    }

    constructor(item, actions, groups, hideDelete, protected onDismissEvent, protected onUpdateItemEvent, protected onDeleteItemEvent,
        protected onGetItem, protected onActionClickedEvent, protected getNewActionFieldsEvent, protected getNewActionItemEvent,
        protected onSaveActionItemEvent, protected onRenderCustomActionEvent, language) {
        super(language);

        this.item = item;
        this.groups = groups;
        this.hideDelete = hideDelete;
        this.actions = actions;
    }


    @action
    public onDismiss = () => {
        this.item = null;
        this.showEmbeddedFieldId = null;
        this.onDismissEvent();
    }

    @action
    public onDismissEditForm = () => {
        this.editItem = null;
        this.editGroup = null;
    }

    @action
    public getItem = () => {
        if (this.item && this.onGetItem) {
            this.isLoading = true;
            from(this.onGetItem(this.item)).pipe(map(g => {
                this.item = g;
                this.isLoading = false;
            })).subscribe();

        }
    }

    @action
    public onDeleteConfirmed = () => {
        this.showDeleteConfirmation = false;
        from(this.onDeleteItemEvent(this.item)).pipe(map(b => {

        })).subscribe();
    }

    @action
    public onDeleteCanceled = () => {
        this.showDeleteConfirmation = false;
    }

    @action
    public onUpdateItem = (item) => {
        return from(this.onUpdateItemEvent(item)).pipe(map(b => {
            this.item = item;
            this.onDismissEditForm();
        })).toPromise();
    }

   

    @action
    public onEditClicked = (groupId) => {
        this.editItem = toJS(this.item);
        this.editGroup = groupId;
    }

    @action
    public onMoreClicked = (fieldId) => {
        this.showEmbeddedFieldId = fieldId;
    }
    

    @action
    public onSaveNewActionItem = (item): Promise<void> => {
        return from(this.onSaveActionItemEvent(this.currentActionId, item, [this.item])).pipe(map((o: any) => {
            this.currentActionId = null;

            if (this.redirectUrl) {
                this.requestRedirect = true;
            }

            this.getItem();

        })).toPromise();
    }

    @action
    public cancelRedirect = () => {

        this.requestRedirect = false;
    }

    @action
    public onNewActionItemDismiss = () => {
        this.currentActionId = null;
    }


    @action
    public onCustomActionDismiss = () => {
        this.currentActionId = null;
    }


    private getAction = (actionId) => {
        let action: IModernAction = this.itemActions.find((g: IModernAction) => g.key == actionId);

        if (action != null) {
            return action;
        }

        this.groups.forEach(v => {
            v.fields.forEach(f => {
                if (action == null && f.action != null && f.action.key == actionId) {
                    action = f.action;
                }

                if (action == null && f.embeddedFields != null) {
                    f.embeddedFields.forEach(s => {
                        if (action == null && s.action != null && s.action.key == actionId) {
                            action = s.action;
                        }
                    });

                }
            });
        });

        return action;
    }

    @action
    public executeAction = (actionId) => {

        const act: IModernAction = this.getAction(actionId);

        const items = [toJS(this.item)];
        switch (act.type) {
            case ModernActionType.form:
                this.currentActionId = act.key;
                this.redirectUrl = act.redirectUrl;
                zip(from(this.getNewActionFieldsEvent(act.key, items)), from(this.getNewActionItemEvent(act.key, items))).pipe(map(g => {
                    this.newActionFields = g[0];
                    this.newActionItem = g[1];
                })).subscribe();
                break;
            case ModernActionType.service:
                this.isLoading = true;

                from(this.onActionClickedEvent(act.key, items)).pipe(map(x => {
                    this.getItem();
                })).subscribe();
                break;

            case ModernActionType.custom:
                this.currentActionId = act.key;
//                from(this.onActionClickedEvent(act.key, items)).subscribe();
                break;
        }

    }

    public onRenderCustomAction = (action) => {
        return this.onRenderCustomActionEvent(toJS(action), [toJS(this.item)]);
    }

    @action
    public onActionClicked = (id) => {
        this.executeAction(id);
    }

    @action
    public onPanelActionClicked = (id) => {
        console.log(id);
        switch (id) {
            case "Delete":
                this.showDeleteConfirmation = true;
                break;
            case "Back":
                this.showEmbeddedFieldId = null;
                break;
            default:
                this.executeAction(id);

                break;
        }
    }

}