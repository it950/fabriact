import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernItemPanelProps } from './IModernItemPanelProps';
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { ModernActionButtonRow } from '../Buttons';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import './ModernItemPanel.module.css';
import ModernItemPanelState from './ModernItemPanelState';
//import PlaceholderImage from './placeholder.svg';
//const logo: any = require('./placeholder.svg');
//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';
//import PlaceholderImage from '../../utilities/images/placeholder.svg';
import { reaction } from 'mobx';

//import PlaceholderImage from 'react-svg-loader!./placeholder.svg';

@observer
export class ModernItemPanel extends React.Component<IModernItemPanelProps, any> {

    config: ModernItemPanelState;

    constructor(props: IModernItemPanelProps) {
        super(props);

        this.config = new ModernItemPanelState(this.props.item, this.props.titleProperty, this.props.descriptionProperty,
            this.props.secondaryDescriptionProperty, this.props.colorProperty, this.props.imageProperty, this.props.language);

        reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });

    }

    public renderHeader = (): JSX.Element => {

        return (<span></span>);

    }




    public renderFooter = (): JSX.Element => {

        if (this.props.renderFooter) {
            return this.props.renderFooter();
        }

        return (<span></span>);


    }

    render() {
        const className = this.props.actions == null || this.props.actions.length == 0 ? "modernInnnerContent" : "modernInnnerContentActions";

        return (
            <Panel type={PanelType.medium} onRenderHeader={this.renderHeader}
                isOpen={this.props.isVisible} onLightDismissClick={this.props.onDismiss}
                isLightDismiss={true}
                className={className}
                onRenderFooterContent={this.renderFooter}
                onRenderNavigation={() => {

                    return (
                        <div>
                            <div className={"modernHeader"} style={{ backgroundColor: this.config.color }}>
                                <div className={"ms-Grid modernHeaderGrid"}>
                                    <div className={"ms-Grid-row"}>
                                        <div className={"ms-Grid-col ms-sm3 ms-md3 ms-lg2"}>
                                            <Persona imageUrl={this.config.imageError || !this.config.image ? null : this.config.image}
                                                onPhotoLoadingStateChange={this.config.imageStateChanged} size={PersonaSize.size72} hidePersonaDetails={true} />
                                        </div>
                                        <div className={"ms-Grid-col ms-sm8 ms-md8 ms-lg9"}>

                                            <div className={"ms-Grid"}>
                                                <div className={"ms-Grid-row"}>
                                                    <div className={"ms-Grid-col ms-sm12"}>
                                                        <div className={"modernfont15"}>
                                                            {this.config.title}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={"ms-Grid-row"}>
                                                    <div className={"ms-Grid-col ms-sm12 "}>
                                                        <div className={"modernfont13"}>
                                                            {this.config.description}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={"ms-Grid-row"}>
                                                    <div className={"ms-Grid-col ms-sm12"}>
                                                        <div className={"modernfont15"}>
                                                            {this.config.secondaryDescription}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className={"ms-Grid-col ms-sm1"}>
                                            <div className={"ms-textAlignRight"}>
                                                <i onClick={this.props.onDismiss} className={"ms-Icon ms-Icon--ChromeClose modernCloseButton"} aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <ModernActionButtonRow buttons={this.props.actions} onClick={this.props.onActionClick} />
                            

                        </div>
                    );


                }}>

                {this.props.children}

            </Panel>
        );
    }
}