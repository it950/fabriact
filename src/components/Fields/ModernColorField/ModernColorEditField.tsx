import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { IModernColorEditFieldProps } from './IModernColorEditFieldProps';
import { observer } from 'mobx-react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { ModernFieldLabel } from '..';

@observer
export class ModernColorEditField extends React.Component<IModernColorEditFieldProps, {}> {

    constructor(props: IModernColorEditFieldProps) {
    super(props);
  }

    private updateItem = (value) => {
        this.props.onChange(this.props.field.key, value);
        return value;
    }


  public render() {
    var value = this.props.value ? this.props.value : "";

    return (
      <span>
            <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

             <ColorPicker onColorChanged={this.updateItem} color={value}  />
        </span>
    );
  
  }
}
