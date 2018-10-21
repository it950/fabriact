import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFieldLabelProps } from './IModernFieldLabelProps';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './ModernFieldLabel.module.css';


@observer
export class ModernFieldLabel extends React.Component<IModernFieldLabelProps, any> {


    constructor(props: IModernFieldLabelProps) {
        super(props);
    }

    render() {
        //className={styles.psaLabel}
        return (
            <Label className={"modernFieldLabel"} required={this.props.required} key={this.props.label}>{this.props.label}</Label>
        );
    }
}