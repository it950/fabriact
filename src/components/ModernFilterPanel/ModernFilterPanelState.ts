import { observable, action, computed, toJS } from "mobx";
import { IModernField } from "../../Modern.Types";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import ModernState from "../../utilities/ModernState";

export default class ModernFilterPanelState extends ModernState {

    @observable
    public currentFilters: any[];

    @observable
    public options: any[];

    @observable
    public field: IModernField;

    @computed
    get panelTitle() {
        if (this.field) {
            if (this.checkedValueCount > 0) {
                return `${this.strings.filterBy} ${this.field.name} (${this.checkedValueCount})`;
            }

            return `${this.strings.filterBy} ${this.field.name}`;

        }

        return this.strings.filterBy;
    }


    @computed
    get isLoaded() {
        return this.options != null;
    }

    @computed
    get checkedValueCount() {
        if (this.options) {
            return this.options.filter(f => f.isChecked).length;
        }

        return 0;
    }

    @computed
    get footerButtons() {
        if (!this.isLoaded) {
            return [];
        }

        return [
            {
                text: this.strings.apply, id: "Apply", isPrimary: true
            },
            {
                text: this.strings.clearAll, id: "Clear"
            }
        ];

    }

    constructor(field, currentFilters, protected onApplyEvent, protected onDismissEvent, protected getFilterOptionsEvent, language) {
        super(language);

        this.field = field;
        this.currentFilters = currentFilters;
    }



    @action
    public onDismiss = () => {
        this.options = null;
        this.onDismissEvent();
    }



    @action
    public getOptions = () => {
        if (this.field) {
            from(this.getFilterOptionsEvent(this.field.key)).pipe(map((p: any) => {

                this.options = p.map(v => {
                    v.isChecked = this.currentFilters && this.currentFilters.findIndex(c => c == v.id) > -1;

                    return v;
                });

            })).subscribe();
        }
    }


    @action
    public update = (value, isChecked) => {
        var current = this.options.find(v => v.id == value);

        current.isChecked = isChecked;
    }

    @action
    public onFooterButtonClick = (key) => {
        switch (key) {
            case "Apply":

                from(this.onApplyEvent(this.field.key, toJS(this.options.filter(g => g.isChecked).map(g => g.id)))).subscribe();

                break;
            case "Clear":
                this.options = this.options.map(v => {
                    v.isChecked = false;

                    return v;
                });

                break;
           
        }
    }

  

}