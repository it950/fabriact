"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ModernCommandBar_1 = require("../ModernCommandBar/ModernCommandBar");
const Button_1 = require("office-ui-fabric-react/lib/Button");
class ModernOfficeList extends React.Component {
    //  config: ModernCommandBarConfig;
    constructor(props) {
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
        return (React.createElement("div", null,
            React.createElement(ModernCommandBar_1.ModernCommandBar, { config: this.props.config.commandBarConfig }),
            React.createElement(Button_1.PrimaryButton, { onClick: () => {
                    //   this.test();
                } }, " ")));
    }
}
exports.ModernOfficeList = ModernOfficeList;
//# sourceMappingURL=ModernOfficeList.js.map