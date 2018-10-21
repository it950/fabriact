import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernMultiLineEditFieldProps } from './IModernMultiLineEditFieldProps';
import { ModernFieldLabel } from '..';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

@observer
export class ModernMultiLineEditField extends React.Component<IModernMultiLineEditFieldProps, any> {

    constructor(props: IModernMultiLineEditFieldProps) {
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

        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <TextField description={this.props.field.description} onChanged={this.updateItem} value={value} autoAdjustHeight multiline
                    validateOnLoad={false} validateOnFocusOut onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage} />
            </span>
        );
    }
}