"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
var src_1 = require("./src");
var Icons_1 = require("office-ui-fabric-react/lib/Icons");
require("office-ui-fabric-react/dist/css/fabric.css");
var ExampleData_1 = require("./ExampleData");
var timers_1 = require("timers");
var mobx_react_1 = require("mobx-react");
var mobx_1 = require("mobx");
Icons_1.initializeIcons( /* optional base url */);
var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo(props) {
        var _this = _super.call(this, props) || this;
        _this.currentPage = 1;
        _this.delay = function (callback) {
            timers_1.setTimeout(function () {
                callback();
            }, 1200);
        };
        _this.getNewActionItem = function (fieldId) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.newActionItem());
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        _this.getNewActionFieldGroups = function (fieldId) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
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
        _this.onSaveNewAction = function (item) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(mobx_1.toJS(_this.exampleData.saveAction(item)));
                });
            });
        };
        _this.getNewOptionItem = function (fieldId) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.newOptionItem());
                    //resolve(this.exampleData.newItem());
                });
            });
        };
        _this.getNewOptionFieldGroups = function (fieldId) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
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
        _this.onSaveNewOption = function (item) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    _this.exampleData.saveOption(item);
                    resolve(mobx_1.toJS(_this.exampleData.metadataMulti));
                });
            });
        };
        _this.onNewItem = function () {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.newItem());
                });
            });
        };
        _this.onSaveNewItem = function (newItem) {
            return new Promise(function (resolve, reject) {
                console.log(newItem);
                _this.delay(function () {
                    _this.exampleData.saveItem(newItem);
                    resolve();
                });
            });
        };
        _this.itemActions = [];
        _this.onGetItem = function (item) {
            return new Promise(function (resolve, reject) {
                console.log(item);
                _this.delay(function () {
                    _this.itemActions = item.email && item.email.indexOf("hotmail.com") > -1 ? _this.exampleData.viewItemActions : [_this.exampleData.viewItemActions[0]];
                    resolve(mobx_1.toJS(_this.exampleData.getItem(item.id)));
                });
            });
        };
        _this.onSortChanged = function (column, ascending) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.getItemsSorted(column, ascending));
                });
            });
        };
        _this.onUpdateItem = function (item) {
            return new Promise(function (resolve, reject) {
                console.log(item);
                //this.exampleData.items.push(newItem);
                _this.delay(function () {
                    _this.exampleData.updateItem(item);
                    resolve();
                    //  this.config.detailsListConfig.items = this.exampleData.items;
                    //    this.config.detailsListConfig.items = toJS(this.exampleData.items);
                    //resolve();
                });
            });
        };
        _this.resolveLookup = function (key, search) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.searchLookup(search));
                });
            });
        };
        _this.resolveSuggestions = function (key) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.getLookups());
                });
            });
        };
        _this.getFilterOptions = function (key) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.getFilterOptions());
                });
            });
        };
        _this.onFilterChanged = function (filters) {
            console.log(filters);
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    if (filters && filters.length > 0) {
                        resolve(_this.exampleData.getFiltered(filters[0].values));
                    }
                    else {
                        resolve(_this.exampleData.getView("1"));
                    }
                });
            });
        };
        _this.onViewChange = function (key) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    var items = key == "4" ? _this.exampleData.getDynamicView(0) : _this.exampleData.getView(key);
                    _this.currentPage = 1;
                    resolve(items);
                    //   resolve(this.exampleData.getView(key));
                });
            });
        };
        _this.onViewOffsetChange = function (offset) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    var items = _this.exampleData.getDynamicView(offset);
                    _this.currentPage = 1;
                    resolve(mobx_1.toJS(items));
                    //   resolve(this.exampleData.getView(key));
                });
            });
        };
        _this.getFieldValue = function (field, item) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.getFieldValue(field, item.id));
                });
            });
        };
        _this.onExport = function () {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(mobx_1.toJS(_this.exampleData.items));
                });
            });
        };
        _this.onNextPage = function () {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    var items = _this.exampleData.getNextPage(_this.currentPage + 1);
                    _this.currentPage++;
                    resolve(items);
                });
            });
        };
        _this.onActionClicked = function (id) {
            return new Promise(function (resolve, reject) {
                alert("Action " + id + " clicked.");
                console.log(id);
                resolve();
                //     resolve(this.exampleData.search(search));
            });
        };
        _this.onSearch = function (search) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    resolve(_this.exampleData.search(search));
                });
            });
        };
        _this.onDelete = function (item) {
            return new Promise(function (resolve, reject) {
                _this.delay(function () {
                    _this.exampleData.deleteItem(item);
                    resolve();
                });
            });
        };
        _this.exampleData = new ExampleData_1.default();
        _this.itemActions = _this.exampleData.viewItemActions;
        return _this;
    }
    Object.defineProperty(Demo.prototype, "hasNextPage", {
        get: function () {
            //  return this.currentPage < 2;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Demo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(src_1.ModernOfficeList, { views: this.exampleData.views, defaultView: "1", onSearch: this.onSearch, onViewChange: this.onViewChange, newItemGroups: this.exampleData.demoNewFieldGroupsData, viewItemActions: this.itemActions, onExport: this.onExport, getNewOptionFieldGroups: this.getNewOptionFieldGroups, getNewOptionItem: this.getNewOptionItem, onSaveNewOption: this.onSaveNewOption, viewItemGroups: this.exampleData.demoViewFieldGroupsData, onGetFieldValue: this.getFieldValue, onNextPage: this.onNextPage, hasNextPage: this.hasNextPage, itemIdProperty: "id", onSaveNewItem: this.onSaveNewItem, onDeleteItem: this.onDelete, resolveLookup: this.resolveLookup, resolveSuggestions: this.resolveSuggestions, language: "nl-NL", onUpdateItem: this.onUpdateItem, itemTitleProperty: "name", itemSecondaryDescriptionProperty: "jobTitle", onFilterChanged: this.onFilterChanged, onSortChanged: this.onSortChanged, getFilterOptions: this.getFilterOptions, itemColorProperty: "color", onSaveNewAction: this.onSaveNewAction, getNewActionFieldGroups: this.getNewActionFieldGroups, getNewActionItem: this.getNewActionItem, onViewOffsetChange: this.onViewOffsetChange, onGetItem: this.onGetItem, onActionClicked: this.onActionClicked, itemDescriptionProperty: "jobType", itemImageProperty: "image", itemAuthorProperty: "author", itemModifiedProperty: "modified", itemCreatedProperty: "created", itemEditorProperty: "editor", onNewItem: this.onNewItem })));
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
    return Demo;
}(React.Component));
ReactDom.render(React.createElement(Demo, null), document.getElementById('root'));
//# sourceMappingURL=app.js.map