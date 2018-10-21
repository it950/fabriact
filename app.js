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
const mobx_1 = require("mobx");
Icons_1.initializeIcons( /* optional base url */);
let Demo = class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.delay = (callback) => {
            timers_1.setTimeout(() => {
                callback();
            }, 1200);
        };
        this.getNewActionItem = (fieldId) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.newActionItem());
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        this.getNewActionFieldGroups = (fieldId) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve([{
                            id: "1",
                            description: "",
                            fields: [{
                                    key: "id",
                                    name: "Id",
                                    type: src_1.ModernFieldType.text,
                                    required: true
                                }, {
                                    key: "title",
                                    name: "Title",
                                    type: src_1.ModernFieldType.text,
                                    required: true,
                                }, {
                                    key: "description",
                                    name: "Description",
                                    type: src_1.ModernFieldType.text
                                }]
                        }]);
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        this.onSaveNewAction = (item) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(mobx_1.toJS(this.exampleData.saveAction(item)));
                });
            });
        };
        this.getNewOptionItem = (fieldId) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.newOptionItem());
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        this.getNewOptionFieldGroups = (fieldId) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve([{
                            id: "1",
                            description: "",
                            fields: [{
                                    key: "id",
                                    name: "Id",
                                    type: src_1.ModernFieldType.text,
                                    required: true
                                }, {
                                    key: "title",
                                    name: "Title",
                                    type: src_1.ModernFieldType.text,
                                    required: true,
                                }]
                        }]);
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        this.onSaveNewOption = (item) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    this.exampleData.saveOption(item);
                    resolve(mobx_1.toJS(this.exampleData.metadataMulti));
                });
            });
        };
        this.onNewItem = () => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.newItem());
                });
            });
        };
        this.onSaveNewItem = (newItem) => {
            return new Promise((resolve, reject) => {
                console.log(newItem);
                this.delay(() => {
                    this.exampleData.saveItem(newItem);
                    resolve();
                });
            });
        };
        this.itemActions = [];
        this.onGetItem = (item) => {
            return new Promise((resolve, reject) => {
                console.log(item);
                this.delay(() => {
                    this.itemActions = item.email && item.email.indexOf("hotmail.com") > -1 ? this.exampleData.viewItemActions : [this.exampleData.viewItemActions[0]];
                    resolve(mobx_1.toJS(this.exampleData.getItem(item.id)));
                });
            });
        };
        this.onSortChanged = (column, ascending) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.getItemsSorted(column, ascending));
                });
            });
        };
        this.onUpdateItem = (item) => {
            return new Promise((resolve, reject) => {
                console.log(item);
                //this.exampleData.items.push(newItem);
                this.delay(() => {
                    this.exampleData.updateItem(item);
                    resolve();
                    //  this.config.detailsListConfig.items = this.exampleData.items;
                    //    this.config.detailsListConfig.items = toJS(this.exampleData.items);
                    //resolve();
                });
            });
        };
        this.resolveLookup = (key, search) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.searchLookup(search));
                });
            });
        };
        this.resolveSuggestions = (key) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.getLookups());
                });
            });
        };
        this.getFilterOptions = (key) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.getFilterOptions());
                });
            });
        };
        this.onFilterChanged = (filters) => {
            console.log(filters);
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    if (filters && filters.length > 0) {
                        resolve(this.exampleData.getFiltered(filters[0].values));
                    }
                    else {
                        resolve(this.exampleData.getView("1"));
                    }
                });
            });
        };
        this.onViewChange = (key) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    const items = key == "4" ? this.exampleData.getDynamicView(0) : this.exampleData.getView(key);
                    this.currentPage = 1;
                    resolve(items);
                    //   resolve(this.exampleData.getView(key));
                });
            });
        };
        this.onViewOffsetChange = (offset) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    const items = this.exampleData.getDynamicView(offset);
                    this.currentPage = 1;
                    resolve(mobx_1.toJS(items));
                    //   resolve(this.exampleData.getView(key));
                });
            });
        };
        this.getFieldValue = (field, item) => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(this.exampleData.getFieldValue(field, item.id));
                });
            });
        };
        this.onExport = () => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    resolve(mobx_1.toJS(this.exampleData.items));
                });
            });
        };
        this.onNextPage = () => {
            return new Promise((resolve, reject) => {
                this.delay(() => {
                    const items = this.exampleData.getNextPage(this.currentPage + 1);
                    this.currentPage++;
                    resolve(items);
                });
            });
        };
        this.onActionClicked = (id) => {
            return new Promise((resolve, reject) => {
                alert("Action " + id + " clicked.");
                console.log(id);
                resolve();
                //     resolve(this.exampleData.search(search));
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
        this.itemActions = this.exampleData.viewItemActions;
    }
    get hasNextPage() {
        //  return this.currentPage < 2;
        return false;
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(src_1.ModernOfficeList, { views: this.exampleData.views, defaultView: "1", onSearch: this.onSearch, onViewChange: this.onViewChange, newItemGroups: this.exampleData.demoNewFieldGroupsData, viewItemActions: this.itemActions, onExport: this.onExport, getNewOptionFieldGroups: this.getNewOptionFieldGroups, getNewOptionItem: this.getNewOptionItem, onSaveNewOption: this.onSaveNewOption, viewItemGroups: this.exampleData.demoViewFieldGroupsData, onGetFieldValue: this.getFieldValue, onNextPage: this.onNextPage, hasNextPage: this.hasNextPage, itemIdProperty: "id", onSaveNewItem: this.onSaveNewItem, onDeleteItem: this.onDelete, resolveLookup: this.resolveLookup, resolveSuggestions: this.resolveSuggestions, language: "nl-NL", onUpdateItem: this.onUpdateItem, itemTitleProperty: "name", itemSecondaryDescriptionProperty: "jobTitle", onFilterChanged: this.onFilterChanged, onSortChanged: this.onSortChanged, getFilterOptions: this.getFilterOptions, itemColorProperty: "color", onSaveNewAction: this.onSaveNewAction, getNewActionFieldGroups: this.getNewActionFieldGroups, getNewActionItem: this.getNewActionItem, onViewOffsetChange: this.onViewOffsetChange, onGetItem: this.onGetItem, onActionClicked: this.onActionClicked, itemDescriptionProperty: "jobType", itemImageProperty: "image", itemAuthorProperty: "author", itemModifiedProperty: "modified", itemCreatedProperty: "created", itemEditorProperty: "editor", onNewItem: this.onNewItem })));
    }
};
__decorate([
    mobx_1.observable
], Demo.prototype, "currentPage", void 0);
__decorate([
    mobx_1.computed
], Demo.prototype, "hasNextPage", null);
__decorate([
    mobx_1.observable
], Demo.prototype, "itemActions", void 0);
__decorate([
    mobx_1.action
], Demo.prototype, "onGetItem", void 0);
__decorate([
    mobx_1.action
], Demo.prototype, "onExport", void 0);
__decorate([
    mobx_1.action
], Demo.prototype, "onNextPage", void 0);
Demo = __decorate([
    mobx_react_1.observer
], Demo);
ReactDom.render(React.createElement(Demo, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map