import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernPhoneEditFieldProps } from './IModernPhoneEditFieldProps';
import { ModernTextEditField } from '../ModernTextField';

@observer
export class ModernPhoneEditField extends React.Component<IModernPhoneEditFieldProps, any> {

    constructor(props: IModernPhoneEditFieldProps) {
        super(props);
    }


    render() {
        
        return (
            <ModernTextEditField field={this.props.field} icon={"Phone"} errorMessage={this.props.errorMessage}
                onChange={this.props.onChange} value={this.props.value} validate={this.props.validate} />
        );
      
    }
}