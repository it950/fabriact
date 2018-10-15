"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
const src_1 = require("./src");
const Icons_1 = require("office-ui-fabric-react/lib/Icons");
require("office-ui-fabric-react/dist/css/fabric.css");
const ExampleData_1 = require("./ExampleData");
const timers_1 = require("timers");
const mobx_react_1 = require("mobx-react");
Icons_1.initializeIcons( /* optional base url */);
let Demo = class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.delay = (callback) => {
            timers_1.setTimeout(() => {
                callback();
            }, 1200);
        };
        this.onNewItem = () => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve({
                        id: null,
                        title: null
                    });
                });
            });
        };
        this.onSaveNewItem = (newItem) => {
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
        };
        this.onViewChange = (key) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.getView(key));
                });
            });
        };
        this.onSearch = (search) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.search(search));
                });
            });
        };
        this.onDelete = (item) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    this.exampleData.deleteItem(item);
                    resolve();
                });
            });
        };
        this.exampleData = new ExampleData_1.default();
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
        return (React.createElement("div", null,
            React.createElement(src_1.ModernOfficeList, { views: this.exampleData.views, defaultView: "1", onSearch: this.onSearch, onViewChange: this.onViewChange, newItemGroups: this.exampleData.demoNewFieldGroupsData, onSaveNewItem: this.onSaveNewItem, onDeleteItem: this.onDelete, items: this.exampleData.items, onNewItem: this.onNewItem })));
    }
};
Demo = __decorate([
    mobx_react_1.observer
], Demo);
ReactDom.render(React.createElement(Demo, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map