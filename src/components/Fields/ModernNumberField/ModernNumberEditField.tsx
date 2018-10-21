import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernNumberEditFieldProps } from './IModernNumberEditFieldProps';
import { ModernFieldLabel } from '..';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

@observer
export class ModernNumberEditField extends React.Component<IModernNumberEditFieldProps, any> {

    constructor(props: IModernNumberEditFieldProps) {
        super(props);
    }


    public textToNumber(value: string) {
        if (value && value.length > 0) {

            value = value.replace(",", ".");
            return parseFloat(value);
        }

        return null;
    }

    private updateItem = (value) => {
        console.log(value);
        this.props.onChange(this.props.field.key, this.textToNumber(value));
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    render() {
        const value = this.props.value ? this.props.value.toString() : "";

        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <TextField description={this.props.field.description} onChanged={this.updateItem} value={value}
                    validateOnLoad={false} validateOnFocusOut onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage} />
            </span>
        );
    }
}