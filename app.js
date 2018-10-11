"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
const Button_1 = require("office-ui-fabric-react/lib/Button");
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
const src_1 = require("./src");
const Icons_1 = require("office-ui-fabric-react/lib/Icons");
const ModernOfficeListConfig_1 = require("./src/components/ModernOfficeList/ModernOfficeListConfig");
//import { ModernOfficeList } from './src/components/ModernOfficeList';
Icons_1.initializeIcons( /* optional base url */);
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.test = () => {
            this.config.views.push({ key: "dd", name: "dsadsa" });
        };
        this.config = new ModernOfficeListConfig_1.default({
            views: [],
            actions: [],
            fields: [],
            items: [],
            totalPages: 1
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(src_1.ModernOfficeList, { config: this.config }),
            React.createElement(Button_1.PrimaryButton, { onClick: () => {
                    this.test();
                } }, " ")));
    }
}
ReactDom.render(React.createElement(Hello, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map