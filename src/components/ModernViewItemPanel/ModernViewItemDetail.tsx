import * as React from 'react';
import { IModernViewItemDetailProps } from "./IModernViewItemDetailProps";
import { observer } from 'mobx-react';
import './ModernViewGroup.module.css';
import { ModernFieldLabel } from '../Fields/ModernFieldLabel';
import ModernViewItemDetailState from './ModernViewItemDetailState';
import { Label } from 'office-ui-fabric-react/lib/Label';


@observer
export class ModernViewItemDetail extends React.Component<IModernViewItemDetailProps, any> {

    config: ModernViewItemDetailState;

    constructor(props: IModernViewItemDetailProps) {
        super(props);

        this.config = new ModernViewItemDetailState(this.props.item, this.props.authorProperty, this.props.editorProperty, this.props.createdProperty, this.props.modifiedProperty,
            this.props.language);

    }

    render() {
        var fields = this.config.labels.map((field, index) => {

            //var value = this.props.item ? this.props.item[field.key] : null;

            return <Label key={field}>{field}</Label>;

        });

        return (
            <div className={"ms-Grid-row"} style={{ paddingTop: "20px" }}>
                <div className={"ms-Grid-col ms-sm12  "}>

                    <div className={"ms-Grid"}>
                        {fields}

                    </div>
                </div>

            </div>
        );
    }
}