import { observable, action, computed, toJS } from "mobx";
import { IModernFieldGroup } from "../../Modern.Types";
import locales from "../../utilities/locales";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from 'moment';

export default class ModernViewItemDetailState {

    @observable
    locale: any;

    constructor(item, authorProperty, editorProperty, createdProperty, modifiedProperty, language) {
        this.locale = new locales(language);

        if (language == "nl-NL") {
            moment.locale('nl');
        }

        this.item = item;
        this.authorProperty = authorProperty;
        this.editorProperty = editorProperty;
        this.createdProperty = createdProperty;
        this.modifiedProperty = modifiedProperty;

    }


    @observable
    public item: any;

    @observable
    public authorProperty: any;

    @observable
    public editorProperty: any;

    @observable
    public createdProperty: any;

    @observable
    public modifiedProperty: any;

    private getText = (user, date, string) => {
    //    let tooltip = moment(date).format("ddd D MMM YYYY, HH:mm");
      //  var date = new Date(date);
        var dateText = moment(date).fromNow();

        return this.locale.strings.formatString(string, dateText, user.title);

    }

    @computed
    get labels() {

        let labels = [];

        if (this.modified && this.editor) {
            labels.push(this.getText(this.editor, this.modified, this.locale.strings.modifiedByLabel));
        }

        if (this.author && this.created) {
            labels.push(this.getText(this.author, this.created, this.locale.strings.createdByLabel));
        }

        return labels;
    }

    @computed
    get author() {
        if (this.item && this.authorProperty) {
            return this.item[this.authorProperty];
        }

        return null;
    }

    @computed
    get editor() {
        if (this.item && this.editorProperty) {
            return this.item[this.editorProperty];
        }

        return null;
    }

    @computed
    get created() {
        if (this.item && this.createdProperty) {
            return this.item[this.createdProperty];
        }

        return null;
    }

    @computed
    get modified() {
        if (this.item && this.modifiedProperty) {
            return this.item[this.modifiedProperty];
        }

        return null;
    }



}