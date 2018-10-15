import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernButtonProps } from './IModernButtonProps';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

@observer
export class ModernButton extends React.Component<IModernButtonProps, any> {


    constructor(props: IModernButtonProps) {
        super(props);
    }


    private onClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <DefaultButton onClick={this.onClick}>
                {this.props.label}
            </DefaultButton>
        );
    }
}