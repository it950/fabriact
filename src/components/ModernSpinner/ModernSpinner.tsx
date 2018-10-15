import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernSpinnerProps } from './IModernSpinnerProps';
import { SpinnerSize, Spinner } from 'office-ui-fabric-react/lib/Spinner';

@observer
export class ModernSpinner extends React.Component<IModernSpinnerProps, any> {


    constructor(props: IModernSpinnerProps) {
        super(props);
    }

    render() {
        const size = this.props.size != null ? this.props.size : SpinnerSize.medium;
        const description = this.props.description != null ? this.props.description : "";

        return (
            <Spinner size={size} label={description} />
        );
    }
}