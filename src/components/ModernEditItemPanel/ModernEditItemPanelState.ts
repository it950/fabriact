import { observable, action, computed, toJS } from "mobx";
import {  IModernField } from "../../Modern.Types";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import ModernState from "../../utilities/ModernState";
import ModernFormValidator from "../ModernForm/ModernFormValidator";

export default class ModernEditItemPanelState extends ModernState {

    validator: ModernFormValidator;

    @observable
    public item: any;

    @observable
    public actions: any;

    @observable
    public isSaving: boolean;

    @observable
    public fields: IModernField[];

    @computed
    get footerButtons() {
        if (!this.item || this.isSaving || !this.fields) {
            return [];
        }

        var items = [
            {
                text: this.strings.save,
                id: "Save",
                isPrimary: true
            },
            {
                text: this.strings.cancel,
                id: "Cancel"
            }
        ];

        return items;
    }

    constructor(item, fields, protected onDismissEvent, protected onUpdateItem, language) {
        super(language);

        this.item = item;
        this.fields = fields;

        this.validator = new ModernFormValidator(this.strings);
    }



    @action
    public onDismiss = () => {
        this.item = null;
        this.onDismissEvent();
    }

    @action
    public onFooterButtonClick = (key) => {
        switch (key) {
            case "Save":
                if (this.validator.validateForm()) {
                    console.log(toJS(this.item));
                    this.isSaving = true;
                    from(this.onUpdateItem(toJS(this.item)))
                        .pipe(map(y => {
                            this.isSaving = false;
                            this.item = null;
                            this.validator = new ModernFormValidator(this.strings);
                        })).subscribe();
                }
                break;
            case "Cancel":
                this.onDismiss();
                break;
        }
    }

   



}