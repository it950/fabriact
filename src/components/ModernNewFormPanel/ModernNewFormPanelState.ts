import { observable, action, computed, toJS } from "mobx";
import { IModernFieldGroup } from "../../Modern.Types";
import locales from "../../utilities/locales";
import { from } from "rxjs";
import { map } from "rxjs/operators";

export default class ModernNewFormPanelState {

    @observable
    locale: any;

    constructor(item, groups, protected onSaveNewItem, protected onDismissEvent, title = null, language = null) {
        this.locale = new locales(language);

        this.item = item;
        this.groups = groups;
        this.title = title;
    }

    @observable
    public title: string;

    @computed
    get panelTitle() {
        if (this.title) {
            return this.title;
        }

        return this.strings.newItem;
    }

    @observable
    public item: any;

    @observable
    public isSaving: boolean;

    @observable
    public isValid: boolean;

    @observable
    public step: number = 0;

    @observable
    public groups: IModernFieldGroup[];
 
    @observable
    public forceValidation: boolean;

    @computed
    get fields() {
        if (this.groups && this.groups.length > 0) {
            return this.groups[this.step].fields;
        }

        return null;
    }

    @computed
    get isLoaded() {
        return this.fields != null && this.item != null;
    }

    @action
    public onFieldChange = (key, value) => {
        this.item[key] = value;
    }

    @action
    public onValidated = (isValid) => {
        this.isValid = isValid;
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
                this.forceValidation = true;

                if (this.isValid) {
                    this.step++;
                }

                break;
            case "Finish":
                this.forceValidation = true;
                if (this.isValid) {
                    console.log(this.item);
                    this.isSaving = true;
                    from(this.onSaveNewItem(toJS(this.item)))
                        .pipe(map(y => {
                            this.isSaving = false;
                            this.step = 0;
                            this.item = null;
                        })).subscribe();

                }

                break;
        }
    }

    @computed
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }

        return {
        };
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

}