import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEditItemPanelProps } from './IModernEditItemPanelProps';
import ModernEditItemPanelState from './ModernEditItemPanelState';
import { reaction } from 'mobx';
import { ModernItemPanel } from '../ModernItemPanel';
import { ModernFieldLabel } from '../Fields';
import { ModernForm } from '../ModernForm';
import { ModernButtonRow } from '../Buttons';
import { ModernSpinner } from '../ModernSpinner';

@observer
export class ModernEditItemPanel extends React.Component<IModernEditItemPanelProps, any> {

    private config: ModernEditItemPanelState;

    constructor(props: IModernEditItemPanelProps) {
        super(props);

        this.config = new ModernEditItemPanelState(this.props.item, this.props.fields, this.props.onDismiss, this.props.onUpdateItem, this.props.language);

        reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });

        reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }

    render() {
        const content = this.config.isSaving ? <ModernSpinner /> : <ModernForm fields={this.props.fields}
            getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewOption={this.props.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
            resolveLookup={this.props.resolveLookup} validator={this.config.validator}
            resolveSuggestions={this.props.resolveSuggestions} item={this.config.item} />;

        const titleHtml = !this.config.isSaving && this.props.title ? <div className={"ms-Grid-row"}>
            <div className={"ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10"}>
                <ModernFieldLabel label={this.props.title} />
            </div>
        </div> : <span></span>;

        
        return (
            <ModernItemPanel item={this.config.item} isVisible={this.props.isVisible} titleProperty={this.props.titleProperty}
                descriptionProperty={this.props.descriptionProperty} onDismiss={this.props.onDismiss} 
                secondaryDescriptionProperty={this.props.secondaryDescriptionProperty} 
                colorProperty={this.props.colorProperty} imageProperty={this.props.imageProperty} 
                renderFooter={() => {
                    return <ModernButtonRow buttons={this.config.footerButtons} onClick={this.config.onFooterButtonClick} />;
                }}>

                <div className={"ms-Grid"}>
                    {titleHtml}
                    <div className={"ms-Grid-row"}>
                        <div className={"ms-Grid-col ms-sm12 ms-md12 ms-lg10 ms-xl10"}>
                            {content}
                        </div>
                    </div>
                </div>
             

            </ModernItemPanel>
        );
    }
}