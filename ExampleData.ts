import { observable, computed, action } from "mobx";
import { IModernView, IModernField, ModernFieldType, IModernFieldGroup } from "./src";
import { IModernOfficeListConfig } from "./src/components/ModernOfficeList/IModernOfficeListConfig";

export default class ExampleData {


    constructor() {
    }

    public getInitialDemoData = () => {
        return [{ id: 1, title: "Title 1", email: "demo1@demo.com", phone: "0612345678", percent: 0.5, multiline: "Multiline text" },
            { id: 2, title: "Title 2", email: "demo2@demo.com", percent: 0.2, multiline: "Multiline text" },
            { id: 3, title: "Title 3", email: "demo3@demo.com", phone: "0612345678", percent: 0.8 },
            { id: 4, title: "Title 4", email: "demo4@demo.com", phone: "0612345678", percent: 0.7, multiline: "Multiline text" },
            { id: 5, title: "Title 5", email: "demo5@demo.com", phone: "0612345678", multiline: "Multiline text" }];
    }

    @action
    public init = () => {
        this.items = this.getInitialDemoData();
    }

    @action
    public saveItem = (item) => {
        this.items.push(item);
    }

    @action
    public getView = (view) => {
        return this.items;
    }

    @action
    public deleteItem = (item) => {
        console.log(item);

        this.items = this.items.filter(d => d.id != item.id);
    }

    @action
    public search = (search) => {
        return this.items.filter(t => t.title.indexOf(search) > -1);
    }

    @observable
    public items: any[];

    @computed
    get views(): IModernView[] {
        return [
            {
                key: "1",
                name: "View 1",
                fields: [this.demoFieldData[0], this.demoFieldData[2], this.demoFieldData[4], this.demoFieldData[5], this.demoFieldData[6]]
            },
            {
                key: "2",
                name: "View 2",
                fields: [this.demoFieldData[1], this.demoFieldData[2], this.demoFieldData[3],  this.demoFieldData[5], this.demoFieldData[6]]
            },
            {
                key: "3",
                name: "Dynamic view",
                isDynamicView: true,
                fields: [this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5]]
            }
        ];
    }

    @computed
    get demoNewFieldGroupsData(): IModernFieldGroup[] {
        return [{
            fields: this.demoFieldData
        }];
    }

    @computed
    get demoNewFieldGroupsWizardData(): IModernFieldGroup[] {
        return [{
            fields: [this.demoFieldData[0], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5], this.demoFieldData[6]]
        }, {
            fields: [this.demoFieldData[1]]
        }];
    }

    @computed
    get demoViewFieldGroupsData(): IModernFieldGroup[] {
        return [{
            fields: this.demoFieldData
        }];
    }

    //@computed
    //get demoItems(): any[] {
    //    return [{ id: 1, title: "No1" }, { id: 2, title: "No2" }];
    //}

    @computed
    get demoFieldData(): IModernField[] {
        return [{
            key: "id",
            name: "Id",
            type: ModernFieldType.integer,
            required: true
        }, {
                key: "title",
                name: "Title",
                type: ModernFieldType.text,
                required: true
            }, {
                key: "email",
                name: "Email",
                type: ModernFieldType.email
            }, {
                key: "phone",
                name: "Phone",
                type: ModernFieldType.phone
            }, {
                key: "percent",
                name: "Percent",
                type: ModernFieldType.percent
            }, {
                key: "date",
                name: "Date",
                type: ModernFieldType.dateTime
            }, {
                key: "metadatamulti",
                name: "Metadata multi",
                isArray: true,
                type: ModernFieldType.managedMetadata,
                options: [{ id: "1", title: "First" },
                    { id: "2", title: "Second" }]
            }, {
                key: "multiline",
                name: "Multiline",
                type: ModernFieldType.multiLine
            },{
                key: "metadata",
                name: "Metadata",
                type: ModernFieldType.managedMetadata,
                options: [{ id: "1", title: "First" },
                    { id: "2", title: "Second" }]
            }];
    }
}