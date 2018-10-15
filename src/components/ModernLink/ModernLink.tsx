import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernLinkProps } from './IModernLinkProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

@observer
export class ModernLink extends React.Component<IModernLinkProps, any> {


    constructor(props: IModernLinkProps) {
        super(props);
    }

    render() {
        return (
            <Link href={this.props.url} >{this.props.label}</Link>
        );
    }
}