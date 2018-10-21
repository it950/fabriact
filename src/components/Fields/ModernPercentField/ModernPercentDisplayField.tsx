import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernPercentDisplayFieldProps } from './IModernPercentDisplayFieldProps';

@observer
export class ModernPercentDisplayField extends React.Component<IModernPercentDisplayFieldProps, any> {


    constructor(props: IModernPercentDisplayFieldProps) {
        super(props);
    }

    render() {
        var decimals = this.props.decimals != null ? this.props.decimals : 1;
        var result = this.props.value != null ? `${(this.props.value * 100).toFixed(decimals)}%` : null;

        return (
            <span>{result}</span>
        );
    }
}