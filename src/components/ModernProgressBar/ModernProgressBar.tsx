import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernProgressBarProps } from './IModernProgressBarProps';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

@observer
export class ModernProgressBar extends React.Component<IModernProgressBarProps, any> {

    constructor(props: IModernProgressBarProps) {
        super(props);
    }

    render() {
   //     const percentComplete = this.props.current / this.props.total;

        return (
            <ProgressIndicator label={this.props.title} description={this.props.description} percentComplete={this.props.percentComplete} />
        );
    }
}