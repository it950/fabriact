import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernNewItemPanelProps } from './IModernNewItemPanelProps';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { ModernForm } from '../ModernForm';
import { ModernSpinner } from '../ModernSpinner';
import ModernNewItemPanelState from './ModernNewItemPanelState';
import { ModernButtonRow } from '../Buttons';
import { reaction } from 'mobx';

@observer
export class ModernNewItemPanel extends React.Component<IModernNewItemPanelProps, any> {

    config: ModernNewItemPanelState;

    constructor(props: IModernNewItemPanelProps) {
        super(props);

        this.config = new ModernNewItemPanelState(this.props.item, this.props.groups, this.props.onSaveNewItem, this.props.onDismiss, this.props.title, this.props.language);

        reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });

        reaction(() => this.props.groups, (groups) => {
            this.config.groups = groups;
        });
    }

    render() {
        const formHtml = this.config.isLoaded && !this.config.isSaving ? <ModernForm fields={this.config.fields} validator={this.config.validator}
            resolveLookup={this.props.resolveLookup}
            getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
            resolveSuggestions={this.props.resolveSuggestions} item={this.config.item} /> : <ModernSpinner />;

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