import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernTextEditFieldProps } from './IModernTextEditFieldProps';
import { ModernEditFieldLabel } from '../ModernEditFieldLabel/ModernEditFieldLabel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

@observer
export class ModernTextEditField extends React.Component<IModernTextEditFieldProps, any> {

    constructor(props: IModernTextEditFieldProps) {
        super(props);
    }


    private updateItem = (value) => {
        this.props.onChange(this.props.field.key, value);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    render() {
        const value = this.props.value ? this.props.value : "";
        const iconProps = this.props.icon ? { iconName: this.props.icon } : null;

        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                <ModernEditFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <TextField description={this.props.field.description} onChanged={this.updateItem} value={value} iconProps={iconProps}
                    validateOnLoad={false} validateOnFocusOut onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage} />
            </span>
        );
    }
}