import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFileDisplayFieldProps } from './IModernFileDisplayFieldProps';
import { ModernLink } from '../../ModernLink';
import { ModernLinkButton } from '../../Buttons';
import { saveAs } from 'file-saver';

@observer
export class ModernFileDisplayField extends React.Component<IModernFileDisplayFieldProps, any> {


    constructor(props: IModernFileDisplayFieldProps) {
        super(props);
    }

    private downloadFile = (item) => {
        saveAs(item.file, item.title);
    }

    render() {

        if (this.props.value) {
            let result = this.props.value.map(v => {

                const link = v.link ? <ModernLink label={v.title} url={v.link} />
                    : <ModernLinkButton label={v.title} id={v.id} onClick={() => {
                        this.downloadFile(v);
                    }} />;

                return (
                    <div className={"ms-Grid-row"} key={v.id}>
                        <div className={"ms-Grid-col ms-sm12"}>
                            {link}
                        </div>
                    </div>
                );

            });

            return (
                <div className={"ms-Grid"}>
                    {result}
                </div>
            );
        }

        return (
            <span></span>
        );
    }
}