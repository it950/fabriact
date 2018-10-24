import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernImageDisplayFieldProps } from './IModernImageDisplayFieldProps';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import './ModernImageDisplayField.module.css';

@observer
export class ModernImageDisplayField extends React.Component<IModernImageDisplayFieldProps, any> {

    constructor(props: IModernImageDisplayFieldProps) {
        super(props);
    }


    render() {
        var result = this.props.value != null ? this.props.value : this.props.placeholder;
        return (
            <Image className={"modernLogoImage"} src={result} imageFit={ImageFit.none} />
        );

    }
}