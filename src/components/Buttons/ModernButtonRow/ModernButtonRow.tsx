import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernButtonRowProps } from './IModernButtonRowProps';
import { ModernPrimaryButton, ModernButton } from '..';

@observer
export class ModernButtonRow extends React.Component<IModernButtonRowProps, any> {


    constructor(props: IModernButtonRowProps) {
        super(props);
    }

    render() {
        //className={styles.psaButtonMargin}
        const buttonsHtml = this.props.buttons ? this.props.buttons.map(b => {

            const buttonHtml = b.isPrimary ? <ModernPrimaryButton label={b.text} id={b.id} onClick={this.props.onClick} />
                : <ModernButton label={b.text} id={b.id} onClick={this.props.onClick} />;

            return <span key={b.id} >{buttonHtml}</span>;
        }) : <span></span>;

        return (
            <span>
                {buttonsHtml}
            </span>
        );
    }
}