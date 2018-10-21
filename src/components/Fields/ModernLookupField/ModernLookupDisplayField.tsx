import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernLookupDisplayFieldProps } from './IModernLookupDisplayFieldProps';

@observer
export class ModernLookupDisplayField extends React.Component<IModernLookupDisplayFieldProps, any> {


    constructor(props: IModernLookupDisplayFieldProps) {
        super(props);
    }

    render() {
        let html = <span></span>;

        if (this.props.value) {
            if (this.props.value.constructor === Array) {

                var lal = this.props.value.map(t => {
                    return t.title;
                }).join(", ");

                html = lal;

            }
            else {
                html = this.props.value.title;
            }

      
        }

        return (
            <span>{html}</span>
        );
    }
}