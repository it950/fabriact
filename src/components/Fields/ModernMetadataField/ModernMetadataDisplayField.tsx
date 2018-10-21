import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernMetadataDisplayFieldProps } from './IModernMetadataDisplayFieldProps';

@observer
export class ModernMetadataDisplayField extends React.Component<IModernMetadataDisplayFieldProps, any> {


    constructor(props: IModernMetadataDisplayFieldProps) {
        super(props);
    }

    render() {
        const value = this.props.value ? this.props.value.constructor == Array ? this.props.value.map(b => b.title).join(", ") : this.props.value.title : "";

        return (
            <span>{value}</span>
        );
    }
}