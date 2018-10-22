import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernBooleanDisplayFieldProps } from './IModernBooleanDisplayFieldProps';
import locales from '../../../utilities/locales';

@observer
export class ModernBooleanDisplayField extends React.Component<IModernBooleanDisplayFieldProps, any> {

    locale: any;

    constructor(props: IModernBooleanDisplayFieldProps) {
        super(props);

        this.locale = new locales(this.props.language);
    }

    render() {
        let test = null;

        const result = this.props.value != null ?
            this.props.value == true ?
                this.locale.strings.yes : this.locale.strings.no : "";

        return (
            <span>{result}</span>
        );
    }
}