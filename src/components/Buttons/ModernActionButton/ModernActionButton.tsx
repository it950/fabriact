import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernActionButtonProps } from './IModernActionButtonProps';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

@observer
export class ModernActionButton extends React.Component<IModernActionButtonProps, any> {


    constructor(props: IModernActionButtonProps) {
        super(props);
    }


    private onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <ActionButton onClick={this.onClick} iconProps={{ iconName: this.props.icon }}>
                {this.props.label}
            </ActionButton>
        );
    }
}