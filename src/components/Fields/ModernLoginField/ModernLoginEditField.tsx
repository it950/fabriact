import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernLoginEditFieldProps } from './IModernLoginEditFieldProps';
import { ModernFieldLabel } from '..';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

@observer
export class ModernLoginEditField extends React.Component<IModernLoginEditFieldProps, any> {

    constructor(props: IModernLoginEditFieldProps) {
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

        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <TextField suffix={this.props.domain} description={this.props.field.description}
                    onChanged={this.updateItem} value={value}
                    validateOnLoad={false} validateOnFocusOut onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage} />
            </span>
        );
    }
}