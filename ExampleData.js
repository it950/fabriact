"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var src_1 = require("./src");
var faker = require("faker/locale/nl");
var moment = require("moment");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var ExampleData = /** @class */ (function () {
    function ExampleData() {
        //faker.locale = "nl";
        var _this = this;
        this.newItem = function () {
            return {
                id: faker.random.uuid(),
                name: faker.name.findName()
            };
        };
        this.newOptionItem = function () {
            return {
                id: faker.random.uuid(),
                title: faker.finance.currencyName()
            };
        };
        this.newActionItem = function () {
            return {
                id: faker.random.uuid(),
                title: faker.name.findName(),
                description: faker.address.streetAddress()
            };
        };
        this.getInitialDemoData = function () {
            var items = [];
            for (var i = 0; i < 200; i++) {
                items.push({
                    id: faker.random.uuid(),
                    name: faker.name.findName(),
                    jobTitle: faker.name.jobTitle(),
                    jobType: faker.name.jobType(),
                    email: faker.internet.email(),
                    async: faker.random.number(),
                    color: faker.internet.color(),
                    multiline: faker.lorem.sentences(),
                    login: faker.internet.userName(),
                    image: faker.image.people(),
                    date: faker.date.past(),
                    boolean: faker.random.boolean(),
                    created: faker.date.past(),
                    choice: _this.choices[Math.floor(Math.random() * _this.choices.length)],
                    choicemulti: [_this.choiceMulti[Math.floor(Math.random() * _this.choiceMulti.length)], _this.choiceMulti[Math.floor(Math.random() * _this.choiceMulti.length)]],
                    user: _this.lookups[Math.floor(Math.random() * _this.lookups.length)],
                    lookup: _this.lookups[Math.floor(Math.random() * _this.lookups.length)],
                    lookupmulti: [_this.lookups[Math.floor(Math.random() * _this.lookups.length)], _this.lookups[Math.floor(Math.random() * _this.lookups.length)]],
                    metadata: _this.metadata[Math.floor(Math.random() * _this.metadata.length)],
                    metadatamulti: [_this.metadataMulti[Math.floor(Math.random() * _this.metadataMulti.length)], _this.metadataMulti[Math.floor(Math.random() * _this.metadataMulti.length)]],
                    author: {
                        id: faker.random.uuid(),
                        title: faker.name.findName()
                    },
                    editor: {
                        id: faker.random.uuid(),
                        title: faker.name.findName()
                    },
                    modified: faker.date.past(),
                    percent: faker.random.number() / 100000,
                    phone: faker.phone.phoneNumber()
                });
            }
            console.log(items);
            return items;
        };
        this.getInitialLookupDemoData = function () {
            var items = [];
            for (var i = 0; i < 100; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.company.companyName(),
                    description: faker.address.streetAddress()
                });
            }
            return items;
        };
        this.getInitialMetadataDemoData = function () {
            var items = [];
            for (var i = 0; i < 5; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.internet.color()
                });
            }
            return items;
        };
        this.getInitialUsersDemoData = function () {
            var items = [];
            for (var i = 0; i < 5; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.name.findName(),
                });
            }
            return items;
        };
        this.getInitialChoicesDemoData = function () {
            var items = [];
            for (var i = 0; i < 5; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.system.fileType()
                });
            }
            return items;
        };
        this.getInitialMetadataMultiDemoData = function () {
            var items = [];
            for (var i = 0; i < 5; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.finance.currencyName()
                });
            }
            return items;
        };
        this.getInitialChoicesMultiDemoData = function () {
            var items = [];
            for (var i = 0; i < 5; i++) {
                items.push({
                    id: faker.random.uuid(),
                    title: faker.date.weekday()
                });
            }
            return items;
        };
        this.init = function () {
            //   this.lookups = this.getInitialLookupDemoData();
            //    this.metadata = this.getInitialMetadataDemoData();
            _this.items = _this.getInitialDemoData();
        };
        this.saveItem = function (item) {
            _this.items.push(item);
        };
        this.saveAction = function (item) {
            _this.lookups.push(item);
            return item;
        };
        this.saveOption = function (item) {
            _this.metadataMulti.push(item);
        };
        this.getItem = function (id) {
            return _this.items.find(function (g) { return g.id == id; });
        };
        this.getItemsSorted = function (field, ascending) {
            return _this.items.sort(function (a, b) {
                if (ascending) {
                    return a[field].localeCompare(b[field]);
                }
                return b[field].localeCompare(a[field]);
            });
        };
        this.updateItem = function (item) {
            console.log(item);
            _this.items.splice(_this.items.findIndex(function (g) { return g.id == item.id; }), 1, item);
        };
        this.getFieldValue = function (field, itemId) {
            var item = _this.items.find(function (a) { return a.id == itemId; });
            return item[field];
        };
        this.getView = function (view) {
            //  return this.items.slice(0, 100);
            return _this.items;
        };
        this.getDynamicView = function (offset) {
            console.log(offset);
            var month = moment().add(offset, "months");
            console.log(month.toISOString());
            return _this.items.filter(function (a) { return month.isSame(a.date, "month"); });
        };
        this.getNextPage = function (page) {
            //(page - 1 * 20)
            var start = ((page - 1) * 100);
            var end = start + 100;
            return _this.items.slice(start, end);
            //     console.log(page);
            //    return [];
            //  return this.items;
        };
        this.getFiltered = function (metadata) {
            return _this.items.filter(function (g) { return metadata.indexOf(g.metadata.id) > -1; });
        };
        this.getFilterOptions = function () {
            return _this.metadata;
        };
        this.getLookups = function () {
            return _this.lookups;
        };
        this.getMetadata = function () {
            return _this.metadata;
        };
        this.deleteItem = function (item) {
            console.log(item);
            _this.items = _this.items.filter(function (d) { return d.id != item.id; });
        };
        this.searchLookup = function (search) {
            return _this.lookups.filter(function (t) { return t.title.indexOf(search) > -1; });
        };
        this.search = function (search) {
            return _this.items.filter(function (t) { return t.name.indexOf(search) > -1; });
        };
        this.lookups = this.getInitialLookupDemoData();
        this.metadata = this.getInitialMetadataDemoData();
        this.metadataMulti = this.getInitialMetadataMultiDemoData();
        this.choiceMulti = this.getInitialChoicesMultiDemoData();
        this.choices = this.getInitialChoicesDemoData();
        this.users = this.getInitialUsersDemoData();
        this.items = this.getInitialDemoData();
    }
    Object.defineProperty(ExampleData.prototype, "viewItemActions", {
        get: function () {
            return [{ name: "Action", type: src_1.ModernActionType.custom, key: "1" },
                { name: "Action Hotmail only", type: src_1.ModernActionType.custom, key: "2" },
                { name: "Form Action", type: src_1.ModernActionType.form, key: "3", redirectUrl: "http://nu.nl" }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleData.prototype, "views", {
        get: function () {
            return [
                {
                    key: "1",
                    name: "View 1",
                    actions: [{ name: "Action 1", key: "1", type: src_1.ModernActionType.custom, selectionMode: DetailsList_1.SelectionMode.none },
                        { name: "Action 3", key: "3", type: src_1.ModernActionType.custom, selectionMode: DetailsList_1.SelectionMode.single },
                        { name: "Action 4", key: "4", type: src_1.ModernActionType.custom, selectionMode: DetailsList_1.SelectionMode.multiple },
                        { name: "Form Action", key: "5", type: src_1.ModernActionType.form, selectionMode: DetailsList_1.SelectionMode.multiple }],
                    fields: [this.demoFieldData[1], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4],
                        this.demoFieldData[11], this.demoFieldData[12], this.demoFieldData[13], this.demoFieldData[20]]
                },
                {
                    key: "2",
                    name: "View 2",
                    actions: [{ name: "Action 2", type: src_1.ModernActionType.custom, key: "2" }],
                    fields: [this.demoFieldData[1], this.demoFieldData[5], this.demoFieldData[6], this.demoFieldData[7],
                        this.demoFieldData[14], this.demoFieldData[15], this.demoFieldData[16]]
                },
                {
                    key: "3",
                    name: "View 3",
                    fields: [this.demoFieldData[1], this.demoFieldData[17], this.demoFieldData[18], this.demoFieldData[21]]
                },
                {
                    key: "4",
                    name: "Dynamic view",
                    isDynamicView: true,
                    fields: [this.demoFieldData[1], this.demoFieldData[8], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5]]
                }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleData.prototype, "demoNewFieldGroupsData", {
        get: function () {
            return [{
                    id: "1",
                    description: "",
                    fields: [this.demoFieldData[0], this.demoFieldData[1], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5],
                        this.demoFieldData[6], this.demoFieldData[7], this.demoFieldData[8], this.demoFieldData[9], this.demoFieldData[10], this.demoFieldData[11],
                        this.demoFieldData[12]]
                }, {
                    id: "2",
                    description: "",
                    fields: [this.demoFieldData[13], this.demoFieldData[14], this.demoFieldData[15], this.demoFieldData[16], this.demoFieldData[17], this.demoFieldData[18]]
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleData.prototype, "demoViewFieldGroupsData", {
        get: function () {
            return [{
                    id: "1",
                    description: "Edit 1",
                    fields: this.demoFieldData.slice(0, 3)
                }, {
                    id: "2",
                    description: "Edit 2",
                    fields: this.demoFieldData.slice(3, 8)
                }, {
                    id: "3",
                    description: "Edit 3",
                    fields: this.demoFieldData.slice(8, 15)
                }, {
                    id: "4",
                    description: "Edit 4",
                    fields: this.demoFieldData.slice(15, 22)
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExampleData.prototype, "demoFieldData", {
        get: function () {
            return [{
                    key: "id",
                    name: "Id",
                    type: src_1.ModernFieldType.text,
                    required: true
                }, {
                    key: "name",
                    name: "Name",
                    type: src_1.ModernFieldType.text,
                    required: true,
                    sortable: true,
                    editGroupTrigger: true
                }, {
                    key: "email",
                    name: "Email",
                    sortable: true,
                    type: src_1.ModernFieldType.email,
                    embeddedFields: [{
                            key: "phone",
                            name: "Phone",
                            type: src_1.ModernFieldType.phone,
                        }]
                }, {
                    key: "phone",
                    sortable: true,
                    name: "Phone",
                    type: src_1.ModernFieldType.phone,
                }, {
                    key: "files",
                    name: "Files",
                    type: src_1.ModernFieldType.file,
                    description: "Drop your files here"
                }, {
                    key: "login",
                    sortable: true,
                    name: "Login",
                    type: src_1.ModernFieldType.login,
                    domain: faker.internet.domainName()
                }, {
                    key: "percent",
                    name: "Percent",
                    editGroupTrigger: true,
                    type: src_1.ModernFieldType.percent
                }, {
                    key: "async",
                    name: "Async",
                    asyncValue: true,
                    type: src_1.ModernFieldType.currency,
                }, {
                    key: "date",
                    name: "Date",
                    type: src_1.ModernFieldType.dateTime
                }, {
                    key: "choice",
                    name: "Choice",
                    type: src_1.ModernFieldType.choice,
                    options: this.choices,
                    action: {
                        name: "Custom",
                        type: src_1.ModernActionType.custom,
                        key: "Custom"
                    }
                }, {
                    key: "choicemulti",
                    name: "Choice multi",
                    multiSelect: true,
                    //      editGroupTrigger: true,
                    type: src_1.ModernFieldType.choice,
                    options: this.choiceMulti
                }, {
                    key: "lookup",
                    name: "Lookup",
                    type: src_1.ModernFieldType.lookup
                }, {
                    key: "lookupmulti",
                    name: "Lookup multi",
                    multiSelect: true,
                    hideInViewForm: true,
                    type: src_1.ModernFieldType.lookup
                }, {
                    key: "metadata",
                    //  editGroupTrigger: true,
                    name: "Metadata",
                    filterable: true,
                    type: src_1.ModernFieldType.managedMetadata,
                    options: this.metadata
                }, {
                    key: "metadatamulti",
                    editGroupTrigger: true,
                    name: "Metadata multi",
                    newOptionItems: true,
                    multiSelect: true,
                    type: src_1.ModernFieldType.managedMetadata,
                    options: this.metadataMulti
                }, {
                    key: "user",
                    editGroupTrigger: true,
                    name: "User",
                    type: src_1.ModernFieldType.user,
                }, {
                    key: "multiline",
                    name: "Multiline",
                    type: src_1.ModernFieldType.multiLine
                }, {
                    key: "jobTitle",
                    name: "Job title",
                    type: src_1.ModernFieldType.text,
                }, {
                    key: "jobType",
                    name: "Job type",
                    readOnly: true,
                    type: src_1.ModernFieldType.text,
                }, {
                    key: "image",
                    name: "Image",
                    type: src_1.ModernFieldType.image,
                }, {
                    key: "created",
                    name: "Created",
                    type: src_1.ModernFieldType.dateTime,
                    asTimeAgo: true,
                    readOnly: true
                }, {
                    key: "boolean",
                    name: "Boolean",
                    type: src_1.ModernFieldType.boolean
                }];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "init", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "saveItem", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "saveAction", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "saveOption", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getItem", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getItemsSorted", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "updateItem", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getFieldValue", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getView", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getDynamicView", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getNextPage", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getFiltered", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getFilterOptions", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getLookups", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "getMetadata", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "deleteItem", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "searchLookup", void 0);
    __decorate([
        mobx_1.action
    ], ExampleData.prototype, "search", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "items", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "users", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "lookups", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "metadata", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "metadataMulti", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "choices", void 0);
    __decorate([
        mobx_1.observable
    ], ExampleData.prototype, "choiceMulti", void 0);
    __decorate([
        mobx_1.computed
    ], ExampleData.prototype, "viewItemActions", null);
    __decorate([
        mobx_1.computed
    ], ExampleData.prototype, "views", null);
    __decorate([
        mobx_1.computed
    ], ExampleData.prototype, "demoNewFieldGroupsData", null);
    __decorate([
        mobx_1.computed
    ], ExampleData.prototype, "demoViewFieldGroupsData", null);
    __decorate([
        mobx_1.computed
    ], ExampleData.prototype, "demoFieldData", null);
    return ExampleData;
}());
exports.default = ExampleData;
//# sourceMappingURL=ExampleData.js.map