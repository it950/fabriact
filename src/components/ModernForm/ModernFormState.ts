import { observable, action, computed } from "mobx";
import ModernState from "../../utilities/ModernState";
import ModernFormValidator from "./ModernFormValidator";
import { from, zip } from "rxjs";
import { map } from "rxjs/operators";
import { IModernFieldGroup } from "../../Modern.Types";

export default class ModernFormState extends ModernState {

    validator: ModernFormValidator;

    @observable
    public newOptionFieldId: string;

    @observable
    public title: string;

    @observable
    public itemSaving: boolean;

    //@observable
    //public step: number = 0;

    @observable
    public newOptionFields: IModernFieldGroup[];

    @observable
    public newOptionItem: any;

    @computed
    get item() {
        return this.validator.item;
    }

    @computed
    get fields() {
        return this.validator.fields;
    }

    @computed
    get errorMessages() {
        return this.validator.errorMessages;
    }

    constructor(item, fields, protected getNewOptionFieldsEvent, protected getNewOptionItemEvent,
        protected onNewOptionSaveEvent, language, validator) {
        super(language);
      
        if (validator) {
            this.validator = validator;
        }
        else {
            this.validator = new ModernFormValidator(this.strings);
        }

        this.validator.item = item;
        this.validator.fields = fields;


    }  


    @action
    public onSaveNewOption = (item) => {
        return from(this.onNewOptionSaveEvent(item)).pipe(map((o: any) => {
            const field = this.validator.fields.find(v => v.key == this.newOptionFieldId);
            field.options = o;
            this.newOptionFieldId = null;
        })).toPromise();
    }

    @action
    public onDismissNewOption = () => {
        this.newOptionFieldId = null;
    }

    @action
    public onNewOption = (fieldId) => {
        this.newOptionFieldId = fieldId;

        zip(from(this.getNewOptionFieldsEvent(fieldId)), from(this.getNewOptionItemEvent(fieldId))).pipe(map(g => {
            console.log(g);
            this.newOptionFields = g[0];
            this.newOptionItem = g[1];
        })).subscribe();
    }

    @action
    public onFieldChange = (key, value) => {
        
        this.validator.item[key] = value;

        console.log(this.validator.item);
    }

}