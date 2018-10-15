import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernMetadataEditFieldProps } from './IModernMetadataEditFieldProps';
import { ModernEditFieldLabel } from '../ModernEditFieldLabel/ModernEditFieldLabel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ModernMetadataButtonField } from './ModernMetadataButton';

@observer
export class ModernMetadataEditField extends React.Component<IModernMetadataEditFieldProps, any> {

    constructor(props: IModernMetadataEditFieldProps) {
        super(props);
    }

    private updateItem = (value) => {
        console.log(value);
        if (this.props.field.isArray) {
            if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.id).length > 0) {
                this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.id).map(v => {
                    return { title: v.title, id: v.id };
                }));
            }
            else {
                var results = this.props.value ? this.props.value : [];

                var newValue = results.push(value);
                this.props.onChange(this.props.field.key, results.map(v => {
                    return { title: v.title, id: v.id };
                }));
            }
        }
        else {
            if (this.props.value && this.props.value.id == value.id) {
                this.props.onChange(this.props.field.key, null);
            }
            else {
                //  var newValue = this.props.values.push(value);
                this.props.onChange(this.props.field.key, { title: value.title, id: value.id });
            }
        }

        //this.props.updateItem(this.props.fieldName, { id: value.id, title: value.title });
        //    return value;
    }

    private updateItem2 = (value) => {
       // this.props.onChange(this.props.field.key, value);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    render() {
        console.log(this.props);
        var buttons = this.props.field.options.map(option => {
            var checked = (this.props.field.isArray && this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == option.id).length > 0)
                || (!this.props.field.isArray && this.props.value && this.props.value.id == option.id);
            return <ModernMetadataButtonField key={option.id} id={option.id} checked={checked} label={option.title} onClicked={this.updateItem} />;

        });

        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                <ModernEditFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {buttons}
            </span>
        );
    }
}