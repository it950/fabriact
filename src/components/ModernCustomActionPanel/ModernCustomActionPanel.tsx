import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernCustomActionPanelProps } from './IModernCustomActionPanelProps';
import { ModernItemPanel } from '../ModernItemPanel';

@observer
export class ModernCustomActionPanel extends React.Component<IModernCustomActionPanelProps, any> {

    constructor(props: IModernCustomActionPanelProps) {
        super(props);
    }

    render() {

        const html = this.props.action != null ? this.props.renderCustomAction(this.props.action) : <span></span>;

        return (
            <ModernItemPanel item={this.props.item} isVisible={this.props.isVisible} titleProperty={this.props.titleProperty}
                descriptionProperty={this.props.descriptionProperty} onDismiss={this.props.onDismiss} 
                secondaryDescriptionProperty={this.props.secondaryDescriptionProperty} 
                colorProperty={this.props.colorProperty} imageProperty={this.props.imageProperty}>

                {html}

            </ModernItemPanel>
        );
    }
}