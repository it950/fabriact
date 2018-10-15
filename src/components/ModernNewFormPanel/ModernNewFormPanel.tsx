import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernNewFormPanelProps } from './IModernNewFormPanelProps';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import {  ModernEditForm } from '../ModernEditForm';
import { ModernSpinner } from '../ModernSpinner';
import ModernNewFormPanelState from './ModernNewFormPanelState';
import { ModernButtonRow } from '../Buttons';
import { reaction } from 'mobx';

@observer
export class ModernNewFormPanel extends React.Component<IModernNewFormPanelProps, any> {

    config: ModernNewFormPanelState;

    constructor(props: IModernNewFormPanelProps) {
        super(props);

        this.config = new ModernNewFormPanelState(this.props.item, this.props.groups, this.props.onSaveNewItem, this.props.onDismiss, this.props.title, this.props.language);

        reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
    }

    render() {
        const formHtml = this.config.isLoaded && !this.config.isSaving ? <ModernEditForm fields={this.config.fields}
            onValidated={this.config.onValidated} forceValidation={this.config.forceValidation}
            item={this.config.item} /> : <ModernSpinner />;

        return (
            <Panel type={PanelType.medium} headerText={this.config.panelTitle}
                isOpen={this.props.isVisible} onDismissed={this.config.onDismiss}
                onRenderFooterContent = {() => {
                    return <ModernButtonRow buttons={this.config.footerButtons} onClick={this.config.onFooterButtonClick} />;
                }}>

                <div className={"ms-Grid"}>
                    <div className={"ms-Grid-row"}>
                        <div className={"ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10"}>
                            {formHtml}
                        </div>
                    </div>
                </div>

            </Panel>
        );
    }
}