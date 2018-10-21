import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernUrlDisplayFieldProps } from './IModernUrlDisplayFieldProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

@observer
export class ModernUrlDisplayField extends React.Component<IModernUrlDisplayFieldProps, any> {


    constructor(props: IModernUrlDisplayFieldProps) {
        super(props);
    }

    render() {

        let html = <span></span>;

        if (this.props.value) {
            html = <Link target={"_blank"} href={this.props.value}>{this.props.value}</Link>;
      
        }

        return (
            <span>{html}</span>
        );
    }
}