import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
import { ModernOfficeList } from './src';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import ModernOfficeListConfig from './src/components/ModernOfficeList/ModernOfficeListConfig';
//import { ModernOfficeList } from './src/components/ModernOfficeList';

initializeIcons(/* optional base url */);

class Hello extends React.Component {

    // <ModernOfficeList />
    config: ModernOfficeListConfig;

    constructor(props) {
        super(props);

        this.config = new ModernOfficeListConfig({
            views: [],
            actions: [],
            fields: [],
            items: [],
            totalPages: 1
        });

    }

    private test = () => {
        this.config.views.push({key: "dd", name: "dsadsa"});
    }

    render() {
        return (
            <div>
                <ModernOfficeList config={this.config} />
                <PrimaryButton onClick={() => {
                       this.test();
                }}> </PrimaryButton>
            </div>
            
        );
    }
}

ReactDom.render(<Hello />, document.getElementById('root'));