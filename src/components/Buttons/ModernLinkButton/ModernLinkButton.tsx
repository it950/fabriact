import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernLinkButtonProps } from './IModernLinkButtonProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

@observer
export class ModernLinkButton extends React.Component<IModernLinkButtonProps, any> {


    constructor(props: IModernLinkButtonProps) {
        super(props);
    }


    private onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <Link onClick={this.onClick} href="#" >
                {this.props.label}
            </Link>
        );
    }
}