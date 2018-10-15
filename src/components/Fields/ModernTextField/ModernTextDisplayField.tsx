import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernTextDisplayFieldProps } from './IModernTextDisplayFieldProps';

@observer
export class ModernTextDisplayField extends React.Component<IModernTextDisplayFieldProps, any> {


    constructor(props: IModernTextDisplayFieldProps) {
        super(props);
    }

    render() {
        const value = this.props.value ? this.props.value : "";

        return (
            <span>{value}</span>
        );
    }
}