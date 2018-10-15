import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernMetadataButtonProps } from './IModernMetadataButtonProps';
import { ModernPrimaryButton, ModernButton } from '../../Buttons';

@observer
export class ModernMetadataButtonField extends React.Component<IModernMetadataButtonProps, any> {

    constructor(props: IModernMetadataButtonProps) {
        super(props);
    }


    private updateItem = (value) => {
        this.props.onClicked({ id: value, title: this.props.label });
        return value;
    }

    

    render() {
        const html = this.props.checked ? <ModernPrimaryButton id={this.props.id} label={this.props.label} onClick={this.updateItem} />
            : <ModernButton id={this.props.id} label={this.props.label} onClick={this.updateItem} />;

        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (
            <span>
                {html}
            </span>
        );
    }
}