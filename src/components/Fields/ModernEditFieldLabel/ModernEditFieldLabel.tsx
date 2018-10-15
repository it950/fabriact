import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEditFieldLabelProps } from './IModernEditFieldLabelProps';
import { Label } from 'office-ui-fabric-react/lib/Label';

@observer
export class ModernEditFieldLabel extends React.Component<IModernEditFieldLabelProps, any> {


    constructor(props: IModernEditFieldLabelProps) {
        super(props);
    }

    render() {
        //className={styles.psaLabel}
        return (
            <Label required={this.props.required} key={this.props.label}>{this.props.label}</Label>
        );
    }
}