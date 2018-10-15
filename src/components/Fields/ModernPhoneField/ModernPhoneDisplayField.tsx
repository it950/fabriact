import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernPhoneDisplayFieldProps } from './IModernPhoneDisplayFieldProps';
import { ModernLink } from '../../ModernLink';

@observer
export class ModernPhoneDisplayField extends React.Component<IModernPhoneDisplayFieldProps, any> {


    constructor(props: IModernPhoneDisplayFieldProps) {
        super(props);
    }

    render() {
        let value = this.props.value ? <ModernLink url={`tel:${this.props.value}`} label={this.props.value} /> : <span></span>;

        return (
            <span>{value}</span>
        );
    }
}