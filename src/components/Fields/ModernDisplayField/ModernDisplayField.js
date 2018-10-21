"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const __1 = require("../../..");
const ModernImageField_1 = require("../ModernImageField");
const __2 = require("..");
const ModernDisplayFieldState_1 = require("./ModernDisplayFieldState");
const rxjs_1 = require("rxjs");
const Shimmer_1 = require("office-ui-fabric-react/lib/Shimmer");
const mobx_1 = require("mobx");
let ModernDisplayField = class ModernDisplayField extends React.Component {
    constructor(props) {
        super(props);
        this.config = new ModernDisplayFieldState_1.default(this.props.item, this.props.field, this.props.onGetFieldValue);
        mobx_1.reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
    }
    componentWillUnmount() {
        if (this.asyncSubscription) {
            this.asyncSubscription.unsubscribe();
        }
    }
    componentDidMount() {
        if (this.config.field.asyncValue) {
            this.asyncSubscription = rxjs_1.from(this.config.init()).subscribe();
        }
    }
    render() {
        let html = null;
        if (!this.config.isLoading) {
            switch (this.props.field.type) {
                case __1.ModernFieldType.image:
                    html = React.createElement(ModernImageField_1.ModernImageDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.lookup:
                    html = React.createElement(__2.ModernLookupDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.boolean:
                    html = React.createElement(__2.ModernBooleanDisplayField, { value: this.config.value, language: this.props.language });
                    break;
                case __1.ModernFieldType.file:
                    html = React.createElement(__2.ModernFileDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.text:
                case __1.ModernFieldType.login:
                case __1.ModernFieldType.multiLine:
                    html = React.createElement(__2.ModernTextDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.number:
                case __1.ModernFieldType.integer:
                    html = React.createElement(__2.ModernNumberDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.percent:
                    html = React.createElement(__2.ModernPercentDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.managedMetadata:
                    html = React.createElement(__2.ModernMetadataDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.dateTime:
                    html = React.createElement(__2.ModernDateDisplayField, { language: this.props.language, value: this.config.value, asTimeAgo: this.props.field.asTimeAgo });
                    break;
                case __1.ModernFieldType.currency:
                    html = React.createElement(__2.ModernCurrencyDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.phone:
                    html = React.createElement(__2.ModernPhoneDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.choice:
                    html = React.createElement(__2.ModernChoiceDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.email:
                    html = React.createElement(__2.ModernEmailDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.user:
                    html = React.createElement(__2.ModernUserDisplayField, { value: this.config.value });
                    break;
                case __1.ModernFieldType.url:
                    html = React.createElement(__2.ModernUrlDisplayField, { value: this.config.value });
                    break;
                default:
                    console.warn(`FieldType ${this.props.field.type} missing`);
                    break;
            }
        }
        else {
            //width={"25%"}
            html = React.createElement(Shimmer_1.Shimmer, null);
        }
        return (React.createElement("span", null, html));
    }
};
ModernDisplayField = __decorate([
    mobx_react_1.observer
], ModernDisplayField);
exports.ModernDisplayField = ModernDisplayField;
//# sourceMappingURL=ModernDisplayField.js.map