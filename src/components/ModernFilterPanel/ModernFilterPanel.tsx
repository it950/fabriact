import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFilterPanelProps } from './IModernFilterPanelProps';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { ModernSpinner } from '../ModernSpinner';
import ModernFilterPanelState from './ModernFilterPanelState';
import { ModernButtonRow } from '../Buttons';
import './ModernFilterPanel.module.css';
import { reaction } from 'mobx';

@observer
export class ModernFilterPanel extends React.Component<IModernFilterPanelProps, any> {

    config: ModernFilterPanelState;

    constructor(props: IModernFilterPanelProps) {
        super(props);

        this.config = new ModernFilterPanelState(this.props.field, this.props.currentFilters, this.props.onApply, this.props.onDismiss,
            this.props.getFilterOptions, this.props.language);

        reaction(() => this.props.field, (field) => {
            this.config.field = field;

            this.config.getOptions();
        });

        reaction(() => this.props.currentFilters, (currentFilters) => {
            this.config.currentFilters = currentFilters;
        });

    }

    render() {
        const formHtml = this.config.isLoaded ? this.config.options.map(s => {
            return <div className={"modernFilterPadding"} key={s.id}>
                <Checkbox label={s.title} onChange={(ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
                    this.config.update(s.id, isChecked);
                }} checked={s.isChecked} ariaDescribedBy={'descriptionID'} />
            </div>;
        }) : <ModernSpinner />;

        return (
            <Panel type={PanelType.smallFixedFar} headerText={this.config.panelTitle}
                isOpen={this.props.isVisible} onDismissed={this.config.onDismiss}
                onRenderFooterContent = {() => {
                    return <ModernButtonRow buttons={this.config.footerButtons} onClick={this.config.onFooterButtonClick} />;
                }}>

                {formHtml}

            </Panel>
        );
    }
}