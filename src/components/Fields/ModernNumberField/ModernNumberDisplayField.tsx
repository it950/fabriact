import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernNumberDisplayFieldProps } from './IModernNumberDisplayFieldProps';

@observer
export class ModernNumberDisplayField extends React.Component<IModernNumberDisplayFieldProps, any> {


    constructor(props: IModernNumberDisplayFieldProps) {
        super(props);
    }

    render() {
        var result = this.props.value != null ? `${this.props.value.toLocaleString("nl-NL")}` : null;

        return (
            <span>{result}</span>
        );
    }
}