import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEmailDisplayFieldProps } from './IModernEmailDisplayFieldProps';
import { ModernLink } from '../../ModernLink';

@observer
export class ModernEmailDisplayField extends React.Component<IModernEmailDisplayFieldProps, any> {


    constructor(props: IModernEmailDisplayFieldProps) {
        super(props);
    }

    render() {
        let value = this.props.value ? <ModernLink url={`mailto:${this.props.value}`} label={this.props.value} /> : <span></span>;

        return (
            <span>{value}</span>
        );
    }
}