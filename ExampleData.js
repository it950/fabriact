"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const src_1 = require("./src");
class ExampleData {
    constructor() {
        this.getInitialDemoData = () => {
            return [{ id: 1, title: "Title 1", email: "demo1@demo.com", phone: "0612345678", percent: 0.5, multiline: "Multiline text" },
                { id: 2, title: "Title 2", email: "demo2@demo.com", percent: 0.2, multiline: "Multiline text" },
                { id: 3, title: "Title 3", email: "demo3@demo.com", phone: "0612345678", percent: 0.8 },
                { id: 4, title: "Title 4", email: "demo4@demo.com", phone: "0612345678", percent: 0.7, multiline: "Multiline text" },
                { id: 5, title: "Title 5", email: "demo5@demo.com", phone: "0612345678", multiline: "Multiline text" }];
        };
        this.init = () => {
            this.items = this.getInitialDemoData();
        };
        this.saveItem = (item) => {
            this.items.push(item);
        };
        this.getView = (view) => {
            return this.items;
        };
        this.deleteItem = (item) => {
            console.log(item);
            this.items = this.items.filter(d => d.id != item.id);
        };
        this.search = (search) => {
            return this.items.filter(t => t.title.indexOf(search) > -1);
        };
    }
    get views() {
        return [
            {
                key: "1",
                name: "View 1",
                fields: [this.demoFieldData[0], this.demoFieldData[2], this.demoFieldData[4], this.demoFieldData[5], this.demoFieldData[6]]
            },
            {
                key: "2",
                name: "View 2",
                fields: [this.demoFieldData[1], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[5], this.demoFieldData[6]]
            },
            {
                key: "3",
                name: "Dynamic view",
                isDynamicView: true,
                fields: [this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5]]
            }
        ];
    }
    get demoNewFieldGroupsData() {
        return [{
                fields: this.demoFieldData
            }];
    }
    get demoNewFieldGroupsWizardData() {
        return [{
                fields: [this.demoFieldData[0], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5], this.demoFieldData[6]]
            }, {
                fields: [this.demoFieldData[1]]
            }];
    }
    get demoViewFieldGroupsData() {
        return [{
                fields: this.demoFieldData
            }];
    }
    //@computed
    //get demoItems(): any[] {
    //    return [{ id: 1, title: "No1" }, { id: 2, title: "No2" }];
    //}
    get demoFieldData() {
        return [{
                key: "id",
                name: "Id",
                type: src_1.ModernFieldType.integer,
                required: true
            }, {
                key: "title",
                name: "Title",
                type: src_1.ModernFieldType.text,
                required: true
            }, {
                key: "email",
                name: "Email",
                type: src_1.ModernFieldType.email
            }, {
                key: "phone",
                name: "Phone",
                type: src_1.ModernFieldType.phone
            }, {
                key: "percent",
                name: "Percent",
                type: src_1.ModernFieldType.percent
            }, {
                key: "date",
                name: "Date",
                type: src_1.ModernFieldType.dateTime
            }, {
                key: "metadatamulti",
                name: "Metadata multi",
                isArray: true,
                type: src_1.ModernFieldType.managedMetadata,
                options: [{ id: "1", title: "First" },
                    { id: "2", title: "Second" }]
            }, {
                key: "multiline",
                name: "Multiline",
                type: src_1.ModernFieldType.multiLine
            }, {
                key: "metadata",
                name: "Metadata",
                type: src_1.ModernFieldType.managedMetadata,
                options: [{ id: "1", title: "First" },
                    { id: "2", title: "Second" }]
            }];
    }
}
__decorate([
    mobx_1.action
], ExampleData.prototype, "init", void 0);
__decorate([
    mobx_1.action
], ExampleData.prototype, "saveItem", void 0);
__decorate([
    mobx_1.action
], ExampleData.prototype, "getView", void 0);
__decorate([
    mobx_1.action
], ExampleData.prototype, "deleteItem", void 0);
__decorate([
    mobx_1.action
], ExampleData.prototype, "search", void 0);
__decorate([
    mobx_1.observable
], ExampleData.prototype, "items", void 0);
__decorate([
    mobx_1.computed
], ExampleData.prototype, "views", null);
__decorate([
    mobx_1.computed
], ExampleData.prototype, "demoNewFieldGroupsData", null);
__decorate([
    mobx_1.computed
], ExampleData.prototype, "demoNewFieldGroupsWizardData", null);
__decorate([
    mobx_1.computed
], ExampleData.prototype, "demoViewFieldGroupsData", null);
__decorate([
    mobx_1.computed
], ExampleData.prototype, "demoFieldData", null);
exports.default = ExampleData;
//# sourceMappingURL=ExampleData.js.map