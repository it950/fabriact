import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernPrimaryButtonProps } from './IModernPrimaryButtonProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

@observer
export class ModernPrimaryButton extends React.Component<IModernPrimaryButtonProps, any> {


    constructor(props: IModernPrimaryButtonProps) {
        super(props);
    }


    private onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <PrimaryButton onClick={this.onClick}>
                {this.props.label}
            </PrimaryButton>
        );
    }
}