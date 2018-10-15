import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernNumberDisplayFieldProps } from './IModernNumberDisplayFieldProps';

@observer
export class ModernNumberDisplayField extends React.Component<IModernNumberDisplayFieldProps, any> {


    constructor(props: IModernNumberDisplayFieldProps) {
        super(props);
    }

    render() {
        return (
            <span></span>
        );
    }
}