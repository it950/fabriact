import { observable, action, computed, toJS } from "mobx";
import { IModernFieldGroup } from "../../Modern.Types";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import ModernFormValidator from "../ModernForm/ModernFormValidator";
import ModernState from "../../utilities/ModernState";

export default class ModernNewItemPanelState extends ModernState {

    validator: ModernFormValidator;


    @observable
    public title: string;

    @observable
    public item: any;

    @observable
    public isSaving: boolean;

    @observable
    public step: number = 0;

    @observable
    public groups: IModernFieldGroup[];

    @computed
    get panelTitle() {
        if (this.title) {
            return this.title;
        }

        return this.strings.newItem;
    }

    @computed
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.step].fields.filter(a => !a.readOnly);
        }

        return null;
    }

    @computed
    get isLoaded() {
        return this.fields != null && this.item != null;
    }

    @computed
    get footerButtons() {
        if (!this.item || this.isSaving || !this.groups) {
            return [];
        }

        var items = [];

        if (this.step > 0) {
            items.push({ text: this.strings.previous, id: "Back" });
        }

        if (this.groups.length - 1 > this.step) {
            items.push({ text: this.strings.next, id: "Next" });
        }

        items.push({ text: this.strings.finish, id: "Finish", isPrimary: true });

        return items;
    }

    constructor(item, groups, protected onSaveNewItem, protected onDismissEvent, title, language) {
        super(language);

        this.item = item;
        this.groups = groups;
        this.title = title;

        this.validator = new ModernFormValidator(this.strings);
    }
    
    @action
    public onDismiss = () => {
        this.item = null;
        this.step = 0;
        this.onDismissEvent();
    }

    @action
    public onFooterButtonClick = (key) => {
        console.log(toJS(this.item));

        switch (key) {
            case "Back":
                this.step--;
                break;
            case "Next":
                if (this.validator.validateForm()) {
                    this.step++;
                }

                break;
            case "Finish":
                if (this.validator.validateForm()) {
                    this.isSaving = true;

                    from(this.onSaveNewItem(toJS(this.item)))
                        .pipe(map(y => {
                            this.isSaving = false;
                            this.step = 0;
                            this.item = null;
                            this.validator = new ModernFormValidator(this.strings);
                        })).subscribe();

                }

                break;
        }
    }

  

}