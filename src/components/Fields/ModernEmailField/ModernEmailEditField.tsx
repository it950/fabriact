import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEmailEditFieldProps } from './IModernEmailEditFieldProps';
import { ModernTextEditField } from '../ModernTextField';

@observer
export class ModernEmailEditField extends React.Component<IModernEmailEditFieldProps, any> {

    constructor(props: IModernEmailEditFieldProps) {
        super(props);
    }


    render() {
        
        return (
            <ModernTextEditField field={this.props.field} icon={"Mail"} errorMessage={this.props.errorMessage}
                onChange={this.props.onChange} value={this.props.value} validate={this.props.validate} />
        );
      
    }
}