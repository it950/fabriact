import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernPercentEditFieldProps } from './IModernPercentEditFieldProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ModernFieldLabel } from '..';

@observer
export class ModernPercentEditField extends React.Component<IModernPercentEditFieldProps, any> {

    constructor(props: IModernPercentEditFieldProps) {
        super(props);
    }

    private updateItem = (value) => {
        this.props.onChange(this.props.field.key, value != null ? parseFloat(value) / 100 : null);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    render() {
        const value = this.props.value != null ? (this.props.value * 100).toString() : "";

        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <TextField description={this.props.field.description} onChanged={this.updateItem} value={value} suffix={'%'} 
                    validateOnLoad={false} validateOnFocusOut onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage} />
            </span>
        );
    }
}