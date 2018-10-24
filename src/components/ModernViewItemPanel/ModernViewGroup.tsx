import * as React from 'react';
import { IModernViewGroupProps } from "./IModernViewGroupProps";
import { observer } from 'mobx-react';
import './ModernViewGroup.module.css';
import { ModernDisplayField } from '../Fields';
import { ModernFieldLabel } from '../Fields/ModernFieldLabel';
import { ModernViewGroupFieldButton } from './ModernViewGroupFieldButton';
import { Label } from 'office-ui-fabric-react/lib/Label';


@observer
export class ModernViewGroup extends React.Component<IModernViewGroupProps, any> {

    constructor(props: IModernViewGroupProps) {
        super(props);
    }

    public onGroupEdit = () => {
        this.props.onEditClicked(this.props.id);
    }

    render() {
        var fields = this.props.item != null ? this.props.fields.map((field, index) => {

            return <div className={"ms-Grid-row"} key={field.key}>
                <div className={"ms-Grid-col ms-sm4"}>
                    <ModernFieldLabel label={field.name} />
                </div>
                <div className={"ms-Grid-col ms-sm6"}>
                    <Label>
                        <ModernDisplayField item={this.props.item} field={field} placeholderImage={this.props.placeholderImage}
                            onGetFieldValue={this.props.onGetFieldValue} language={this.props.language} />
                    </Label>
                </div>
                <div className={"ms-Grid-col ms-sm2"}>
                    <ModernViewGroupFieldButton field={field} onActionClicked={this.props.onActionClicked} language={this.props.language}
                        onEditClicked={this.onGroupEdit} onMoreClicked={this.props.onMoreClicked} />
                </div>
            </div>;

        }) : <span></span>;

        return (
            <div className={"ms-Grid-row viewGroup"}>
                <div className={"ms-Grid-col ms-sm12  "}>

                    <div className={"ms-Grid"}>
                        {fields}

                    </div>
                </div>

            </div>
        );
    }
}