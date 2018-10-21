"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const locales_1 = require("../../utilities/locales");
const moment = require("moment");
class ModernViewItemDetailState {
    constructor(item, authorProperty, editorProperty, createdProperty, modifiedProperty, language) {
        this.getText = (user, date, string) => {
            //    let tooltip = moment(date).format("ddd D MMM YYYY, HH:mm");
            //  var date = new Date(date);
            var dateText = moment(date).fromNow();
            return this.locale.strings.formatString(string, dateText, user.title);
        };
        this.locale = new locales_1.default(language);
        if (language == "nl-NL") {
            moment.locale('nl');
        }
        this.item = item;
        this.authorProperty = authorProperty;
        this.editorProperty = editorProperty;
        this.createdProperty = createdProperty;
        this.modifiedProperty = modifiedProperty;
    }
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
    get author() {
        if (this.item && this.authorProperty) {
            return this.item[this.authorProperty];
        }
        return null;
    }
    get editor() {
        if (this.item && this.editorProperty) {
            return this.item[this.editorProperty];
        }
        return null;
    }
    get created() {
        if (this.item && this.createdProperty) {
            return this.item[this.createdProperty];
        }
        return null;
    }
    get modified() {
        if (this.item && this.modifiedProperty) {
            return this.item[this.modifiedProperty];
        }
        return null;
    }
}
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "item", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "authorProperty", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "editorProperty", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "createdProperty", void 0);
__decorate([
    mobx_1.observable
], ModernViewItemDetailState.prototype, "modifiedProperty", void 0);
__decorate([
    mobx_1.computed
], ModernViewItemDetailState.prototype, "labels", null);
__decorate([
    mobx_1.computed
], ModernViewItemDetailState.prototype, "author", null);
__decorate([
    mobx_1.computed
], ModernViewItemDetailState.prototype, "editor", null);
__decorate([
    mobx_1.computed
], ModernViewItemDetailState.prototype, "created", null);
__decorate([
    mobx_1.computed
], ModernViewItemDetailState.prototype, "modified", null);
exports.default = ModernViewItemDetailState;
//# sourceMappingURL=ModernViewItemDetailState.js.map