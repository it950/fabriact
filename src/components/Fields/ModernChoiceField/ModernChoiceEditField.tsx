import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernChoiceEditFieldProps } from './IModernChoiceEditFieldProps';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ModernFieldLabel } from '..';

@observer
export class ModernChoiceEditField extends React.Component<IModernChoiceEditFieldProps, any> {

    constructor(props: IModernChoiceEditFieldProps) {
        super(props);
    }


    //private updateItem = (value) => {
    //    var result = null;
    //    console.log(value);
    //    if (!this.props.field.multiSelect) {
    //        result = value.key;
    //    }
    //    else {
    //        result = this.props.value;

    //        if (value.selected) {

    //            if (this.props.value) {
    //                result.push(value.key);
    //            }
    //            else {
    //                result = [value.key];
    //            }
    //        }
    //        else {
    //            result.splice(result.indexOf(value.key), 1);
    //        }
    //    }
    //    console.log("UPDATE WITH");
    //    console.log(result);
    //    this.props.onChange(this.props.field.key, result);
    //}

    private updateItem = (value) => {
        console.log(value);
        if (this.props.field.multiSelect) {
            if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.key).length > 0) {
                //this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key).map(v => {
                //    return { title: v.text, id: v.key };
                //}));
                this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key));
            }
            else {
                var results = this.props.value ? this.props.value : [];

                results.push({ title: value.text, id: value.key });
                //this.props.onChange(this.props.field.key, results.map(v => {
                //    return { title: v.text, id: v.key };
                //}));

                this.props.onChange(this.props.field.key, results);
            }
        }
        else {
            if (this.props.value && this.props.value.id == value.key) {
                this.props.onChange(this.props.field.key, null);
            }
            else {
                //  var newValue = this.props.values.push(value);
                this.props.onChange(this.props.field.key, { title: value.text, id: value.key });
            }
        }

        //this.props.updateItem(this.props.fieldName, { id: value.id, title: value.title });
        //    return value;
    }

    private updateItem3 = (value) => {
       // this.props.onChange(this.props.field.key, value);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    private modernLookupFieldToDropdownOptionMapping = (modernLookupField) => {
        var persona: IDropdownOption = {
          //  title: modernLookupField.title,
            key: modernLookupField.id,
          //  imageUrl: modernLookupField.image,
           // secondaryText: modernLookupField.secondaryText,
            text: modernLookupField.title,
        };

        return persona;
    }

    render() {
        console.log(this.props);
        const options = this.props.field.options.map(c => this.modernLookupFieldToDropdownOptionMapping(c));

        //defaultSelectedKeys={toJS(this.props.value)}
        // defaultSelectedKey={this.props.value}

        let field = <span></span>;

        if (this.props.field.multiSelect) {
            const keys = this.props.value ? this.props.value.map(i => i.id) : [];

            field = <Dropdown multiSelect onChanged={this.updateItem} options={options} defaultSelectedKeys={keys} />;
        }
        else {
            const key = this.props.value ? this.props.value.id : null;
            field = <Dropdown onChanged={this.updateItem} options={options} defaultSelectedKey={key} />;
        }
//        this.props.value ? this.props.value.map(i => i.id)

        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {field}
            </span>
        );
    }
}