import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernBooleanEditFieldProps } from './IModernBooleanEditFieldProps';
import { ModernFieldLabel } from '..';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

@observer
export class ModernBooleanEditField extends React.Component<IModernBooleanEditFieldProps, any> {

    constructor(props: IModernBooleanEditFieldProps) {
        super(props);
    }

    private updateItem = (value, checked) => {
        console.log(checked);
        this.props.onChange(this.props.field.key, checked);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    render() {
        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                <Checkbox onChange={this.updateItem} defaultChecked={this.props.value} />
            </span>
        );
    }
}