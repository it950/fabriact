import { observable, action, toJS, computed } from "mobx";
import { IModernField } from "../../../Modern.Types";
import { from } from "rxjs";
import { map } from "rxjs/operators";

export default class ModernDisplayFieldState {

    @observable
    field: IModernField;

    @observable
    value: any;

  //  @observable
    _item: any;

    @observable
    isLoading: boolean;

    @computed
    get item() {
        return this._item;
    }

    set item(value) {
        this._item = value;

        if (!this.field.asyncValue) {
            this.value = value[this.field.key];
        }
    }

    constructor(item, field: IModernField, protected onGetFieldValueEvent) {
        this.field = field;
        this.item = item;

        if (!field.asyncValue) {
            this.value = this.item[this.field.key];
        }
        else {
            this.isLoading = true;
        }
    }

    @action
    public init = () => {
        return from(this.onGetFieldValueEvent(this.field.key, toJS(this.item))).pipe(map(g => {
            this.value = g;
            this.isLoading = false;
        })).toPromise();

    }

}