import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDateEditFieldProps } from './IModernDateEditFieldProps';
import { ModernFieldLabel } from '..';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { ModernDatePicker } from '..';

@observer
export class ModernDateEditField extends React.Component<IModernDateEditFieldProps, any> {

    constructor(props: IModernDateEditFieldProps) {
        super(props);
    }


    private updateItem = (value) => {
        console.log(value);
        this.props.onChange(this.props.field.key, value);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    private onClear = () => {
        this.props.onChange(this.props.field.key, null);
    }

    render() {
        var clearButton = !this.props.field.required && this.props.value != null ?
            <IconButton onClick={this.onClear} iconProps={{ iconName: 'Clear' }} />
            : <span></span>;
        //placeholder={this.props.placeholder}
        var field = <ModernDatePicker onChange={this.updateItem} value={this.props.value} />;


        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <div className={"ms-Grid-row"}>
                    <div className={"ms-Grid-col ms-sm11"}>
                        {field}
                    </div>
                    <div className={"ms-Grid-col ms-sm1"}>
                        <div className={"ms-textAlignRight"}>
                            {clearButton}
                        </div>
                    </div>
                </div>

            </span>
        );
    }
}