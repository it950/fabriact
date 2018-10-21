import { observable, computed } from "mobx";
import locales from "./locales";



export default class ModernState {

    @observable
    private locale: any;

    @computed
    get strings() {
        if (this.locale) {
            return this.locale.strings;
        }

        return {
        };
    }

    constructor(language) {

        this.locale = new locales(language);
    }


}