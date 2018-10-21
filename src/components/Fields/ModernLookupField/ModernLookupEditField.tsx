import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernLookupEditFieldProps } from './IModernLookupEditFieldProps';
import { NormalPeoplePicker, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModernFieldLabel } from '..';

@observer
export class ModernLookupEditField extends React.Component<IModernLookupEditFieldProps, any> {

    constructor(props: IModernLookupEditFieldProps) {
        super(props);
    }


    private updateItem = (items) => {


        if (this.props.field.multiSelect) {


            this.props.onChange(this.props.field.key, items.map(t => {
                return {
                    id: t.id, title: t.title
                };
            }));
        }
        else {
            if (items.length > 0) {
                this.props.onChange(this.props.field.key, { id: items[0].id, title: items[0].title });
            }
            else {
                this.props.onChange(this.props.field.key, null);
            }
        }

        // this.props.validate(this.props.field, items);

    }


    //private updateItem = (value) => {
    //    this.props.onChange(this.props.field.key, value);
    //    return value;
    //}

    private getErrorMessage = (value: string) => {
        this.props.validate(this.props.field, value);
    }

    private modernLookupFieldToPersonaMapping = (modernLookupField) => {
        var persona: IPersonaProps = {
            title: modernLookupField.title,
            id: modernLookupField.id,
            imageUrl: modernLookupField.image,
            secondaryText: modernLookupField.secondaryText,
            text: modernLookupField.title,
        };

        return persona;
    }


    private _onFocus = (items) => {
      //  console.log(toJS(this.props.value));
       // console.log(items);
      ///  console.log(this.props.resolveSuggestions);
        if (this.props.resolveSuggestions) {
            return from(this.props.resolveSuggestions()).pipe(map(t => {
                console.log(t);
                return t.filter(v => this.props.value == null || this.props.value.find(k => k.id == v.id) == null).map(v => {
                    return this.modernLookupFieldToPersonaMapping(v);

                    //var description = v.PsaPrimaryDescription ? v.PsaPrimaryDescription : v.PsaDescription;
                    //return {
                    //    title: v.PsaTitle,
                    //    id: v.PsaId,
                    //    imageUrl: v.PsaImage,
                    //    secondaryText: description,
                    //    showSecondaryText: description != null,
                    //    text: v.PsaTitle
                    //};
                });
            })).toPromise();
        }
        else {
            return [];
        }
    }


    private _validateInput = (input: string): ValidationState => {

        if (input.indexOf('@') !== -1) {
            return ValidationState.valid;
        } else if (input.length > 1) {
            return ValidationState.warning;
        } else {
            return ValidationState.invalid;
        }
    }



    private _onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] | Promise<IPersonaProps[]> => {
        console.log("_onFilterChanged");
        console.log(filterText);
        if (filterText) {

            return from(this.props.resolveLookup(filterText)).pipe(
                map(t => {
                    console.log(t);
                    return t.filter(v => this.props.value == null || this.props.value.find(k => k.id == v.id) == null).map(v => {
                        return this.modernLookupFieldToPersonaMapping(v);
                    });
                })).toPromise();
        } else {
            return [];
        }
    }



    render() {
        const itemLimit = this.props.field.multiSelect ? 100 : 1;

        let values = this.props.field.multiSelect ? (this.props.value != null && this.props.value.length > 0) ? this.props.value.map(v => {
            return this.modernLookupFieldToPersonaMapping(v);
        }) : [] : this.props.value != null ? [ this.modernLookupFieldToPersonaMapping(this.props.value) ] : [];

        // className={errorClass}

        var picker = <NormalPeoplePicker defaultSelectedItems={values}
            onValidateInput={this._validateInput} onEmptyInputFocus={this._onFocus}
            itemLimit={itemLimit} resolveDelay={500} onResolveSuggestions={this._onFilterChanged} onChange={this.updateItem} ></NormalPeoplePicker>;


        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {picker}
            </span>
        );
    }
}