import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDisplayFieldProps } from './IModernDisplayFieldProps';
import { ModernFieldType } from '../../..';
import { ModernImageDisplayField } from '../ModernImageField';

@observer
export class ModernDisplayField extends React.Component<IModernDisplayFieldProps, any> {


    constructor(props: IModernDisplayFieldProps) {
        super(props);
    }

    render() {

        let html = null;

        switch (this.props.field.type) {

            case ModernFieldType.image:
                html = <ModernImageDisplayField value={this.props.value} />;

                break;
          
            default:
                console.warn("FieldType missing");
                break;
        }

        return (
            <span>{html}</span>
        );
    }
}