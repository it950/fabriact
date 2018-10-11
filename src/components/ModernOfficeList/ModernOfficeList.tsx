import * as React from 'react';
import { IModernOfficeListProps } from './IModernOfficeListProps';
import { ModernCommandBar } from '../ModernCommandBar/ModernCommandBar';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import ModernCommandBarConfig from '../ModernCommandBar/ModernCommandBarConfig';

export class ModernOfficeList extends React.Component<IModernOfficeListProps, any> {

  //  config: ModernCommandBarConfig;

    constructor(props: IModernOfficeListProps) {
        super(props);
      //  this.setState({ hideNew: false });
        //this.state = { hideNew: false };
        //this.config = new ModernCommandBarConfig({
        //    views: [],
        //    actions: [],
        //    onActionClicked: this.actionClicked,
        //    onViewClicked: this.actionClicked,
        //    onViewTypeSwitch: this.actionClicked
        //});
    }

    //private actionClicked = (action) => {
    //    console.log(action);
   
    // //   this.props.onActionClicked(action);
    //}

    //private test = () => {
    //    // console.log(action);
    //    // this.setState({ hideNew: !this.state.hideNew });
    //    this.config.hideNew = !this.config.hideNew;
    //    //   this.props.onActionClicked(action);
    //}

    //private viewCick = (viewId) => {
    //    console.log(viewId);
        
    //    //   this.props.onActionClicked(action);
    //}

    render() {
     

        return (
            <div>
                <ModernCommandBar config={this.props.config.commandBarConfig} />
                <PrimaryButton onClick={() => {
                 //   this.test();
                }}> </PrimaryButton>
            </div>
        );
    }
}