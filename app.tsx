import * as React from 'react';
import * as ReactDom from 'react-dom';
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
import { ModernOfficeList } from './src';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import 'office-ui-fabric-react/dist/css/fabric.css';
import ExampleData from './ExampleData';
import { setTimeout } from 'timers';
import { observer } from 'mobx-react';

initializeIcons(/* optional base url */);

@observer
class Demo extends React.Component {


    exampleData: ExampleData;

    constructor(props) {
        super(props);

        this.exampleData = new ExampleData();

    }

    private delay = (callback) => {
        setTimeout(() => {
            callback();
        }, 1200);
    }

    private onNewItem = (): Promise<any> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve({
                    id: null,
                    title: null
                });
            });
        });
    }

    private onSaveNewItem = (newItem): Promise<void> => {

        return new Promise((resolve, reject) => {
            console.log(newItem);
            //this.exampleData.items.push(newItem);
            this.delay(() => {
                this.exampleData.saveItem(newItem);
                resolve();
                //  this.config.detailsListConfig.items = this.exampleData.items;
              
            //    this.config.detailsListConfig.items = toJS(this.exampleData.items);
                resolve();
            });
        });
    
    }

    private onViewChange = (key): Promise<any[]>  => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.getView(key));
            });
        });
    }

    private onSearch = (search): Promise<any[]>  => {
        return new Promise((resolve, reject) => {
        this.delay(() => {
            resolve(this.exampleData.search(search));
        });
        });
    }

    private onDelete = (item): Promise<void> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                this.exampleData.deleteItem(item);
                resolve();
            });
        });
    }

    componentDidMount() {
        this.delay(() => {
            console.log("wooo");
            this.exampleData.init();
       //     this.exampleData.items = this.exampleData.getInitialDemoData();
         //   console.log(this.exampleData.items );
           // this.config.detailsListConfig.items = toJS(this.exampleData.items);
        });
    }

    render() {
        return (
            <div>
                <ModernOfficeList views={this.exampleData.views} defaultView={"1"} onSearch={this.onSearch}
                    onViewChange={this.onViewChange} newItemGroups={this.exampleData.demoNewFieldGroupsData}
                    onSaveNewItem={this.onSaveNewItem} onDeleteItem={this.onDelete}
                    items={this.exampleData.items} onNewItem={this.onNewItem} />
            </div>
            
        );
    }
}

ReactDom.render(<Demo />, document.getElementById('root'));