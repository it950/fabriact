import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernActionButtonRowProps } from './IModernActionButtonRowProps';
import { ModernActionButton } from '..';
import './ModernActionButtonRow.module.css';

@observer
export class ModernActionButtonRow extends React.Component<IModernActionButtonRowProps, any> {


    constructor(props: IModernActionButtonRowProps) {
        super(props);
    }

    render() {

        const actions = this.props.buttons != null ? this.props.buttons.map(g => {

            return <span key={g.key} className={"actionButtonContainer"}> <ModernActionButton
                label={g.name} icon={g.icon} id={g.key}
                onClick={this.props.onClick} /></span>;
        }) : <span></span>;



        return (
            <div className={"actionsRow"}>
                <div className={"ms-Grid"}>
                    <div className={"ms-Grid-row"}>
                        <div className={"ms-Grid-col ms-sm12"}>

                            <div className={"ms-Grid"}>
                                <div className={"ms-Grid-row actionButtonRow"}>
                                    <div className={"ms-Grid-col ms-sm12"}>
                                        {actions}
                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>

                </div>
            </div>
        );

    }
}