import { observable, computed, action } from "mobx";
import { IModernField, ModernFieldType } from "../..";

export default class ModernFormValidator {

    @observable
    public errorMessages: any;

    @observable
    public item: any;

    @observable
    public fields: IModernField[];

    @computed
    get isItemValid() {
        if (this.fields) {
            let errors = this.getErrorMap();
            console.log(errors);

            return errors.length == 0;
        }

        return false;
    }

    constructor(private strings) {

    }

    private getErrorMap = () => {
        return this.fields.map(f => {
            return {
                field: f.key,
                error: this.validateField(f, this.item[f.key])
            };
        }).filter(t => t.error != "");
    }


    @action
    public validateForm = () => {
        this.errorMessages = this.getErrorMap();

        return this.errorMessages.length == 0;
    }


    @action
    public validateFormField = (field: IModernField, value) => {
        const result = this.validateField(field, value);

        //if (result == "" && this.errorMessages) {
        //    this.errorMessages = this.errorMessages.filter(g => g.field != field.key);
        //}

        return result;
    }

    private isEmptyString = (field, value: string) => {
       

        switch (field.type) {
            case ModernFieldType.text:
            case ModernFieldType.email:
            case ModernFieldType.phone:
            case ModernFieldType.login:
                if (!value) {
                    return true;
                }
                return value.trim().length == 0;
            default:
                return false;

        }

    }

    public validateField = (field: IModernField, value) => {
        if (field.required && (value == null || value.length == 0 || this.isEmptyString(field, value))) {
            return this.strings.formatString(this.strings.requiredField, field.name);
        }

        switch (field.type) {
            case ModernFieldType.number:
            case ModernFieldType.integer:
                if (isNaN(value)) {
                    return this.strings.formatString(this.strings.numberNotValid, field.name);
                }

                //  if (value != null && field.NumberSteps != null && (value % field.NumberSteps)) {
                //                  return this.strings.NumberNotValid.replace("{0}", field.DisplayName);
                //  }

                break;
            case ModernFieldType.email:
                if (value && value.length > 0 && !this.validateEmail(value)) {
                    return this.strings.formatString(this.strings.emailNotValid, field.name);
                }

                break;
            case ModernFieldType.phone:
                if (value && value.length > 0 && !this.validatePhone(value)) {
                    return this.strings.formatString(this.strings.phoneNotValid, field.name);
                }

                break;
            case ModernFieldType.login:
                if (value && value.length > 0 && !this.validateLogin(value)) {
                    return this.strings.formatString(this.strings.loginNotValid, field.name);
                }

                break;
            default:
                break;
        }

        return "";

    }


    private validatePhone = (phone) => {
        const re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
        return re.test(String(phone).toLowerCase());
    }

    private validateLogin = (login) => {
        const re = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
        return re.test(String(login).toLowerCase());
    }

    private validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


}