import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernCurrencyDisplayFieldProps } from './IModernCurrencyDisplayFieldProps';

@observer
export class ModernCurrencyDisplayField extends React.Component<IModernCurrencyDisplayFieldProps, any> {


    constructor(props: IModernCurrencyDisplayFieldProps) {
        super(props);
    }

    render() {
        var result = this.props.value != null ? `€ ${this.props.value.toLocaleString("nl-NL")}` : <span></span>;

        return (
            <span>{result}</span>
        );
    }
}