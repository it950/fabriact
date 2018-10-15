import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDateDisplayFieldProps } from './IModernDateDisplayFieldProps';

@observer
export class ModernDateDisplayField extends React.Component<IModernDateDisplayFieldProps, any> {


    constructor(props: IModernDateDisplayFieldProps) {
        super(props);
    }

    render() {
        var result = this.props.value != null ? `€ ${this.props.value.toLocaleString("nl-NL")}` : <span></span>;

        return (
            <span>{result}</span>
        );
    }
}