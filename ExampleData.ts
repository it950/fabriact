import { observable, computed, action } from "mobx";
import { IModernView, IModernField, ModernFieldType, IModernFieldGroup, IModernAction, ModernActionType } from "./src";
var faker = require('faker');
import * as moment from 'moment';
import { SelectionMode } from "office-ui-fabric-react/lib/DetailsList";

export default class ExampleData {


    constructor() {

        faker.locale = "nl";

        this.lookups = this.getInitialLookupDemoData();
        this.metadata = this.getInitialMetadataDemoData();
        this.metadataMulti = this.getInitialMetadataMultiDemoData();
        this.choiceMulti = this.getInitialChoicesMultiDemoData();
        this.choices = this.getInitialChoicesDemoData();
        this.users = this.getInitialUsersDemoData();
        this.items = this.getInitialDemoData();
        
      
    }

    public newItem = () => {
        return {
            id: faker.random.uuid(),
            name: faker.name.findName()
        };
    }

    public newOptionItem = () => {
        return {
            id: faker.random.uuid(),
            title: faker.finance.currencyName()
        };
    }

    public newActionItem = () => {
        return {
            id: faker.random.uuid(),
            title: faker.name.findName(),
            description: faker.address.streetAddress()
        };
    }

    public getInitialDemoData = () => {
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
                choice: this.choices[Math.floor(Math.random() * this.choices.length)],
                choicemulti: [this.choiceMulti[Math.floor(Math.random() * this.choiceMulti.length)], this.choiceMulti[Math.floor(Math.random() * this.choiceMulti.length)]],
                user: this.lookups[Math.floor(Math.random() * this.lookups.length)],
                lookup: this.lookups[Math.floor(Math.random() * this.lookups.length)],
                lookupmulti: [this.lookups[Math.floor(Math.random() * this.lookups.length)], this.lookups[Math.floor(Math.random() * this.lookups.length)]],
                metadata: this.metadata[Math.floor(Math.random() * this.metadata.length)],
                metadatamulti: [this.metadataMulti[Math.floor(Math.random() * this.metadataMulti.length)], this.metadataMulti[Math.floor(Math.random() * this.metadataMulti.length)]],
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

    }

    public getInitialLookupDemoData = () => {
        var items = [];

        for (var i = 0; i < 100; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.company.companyName(),
                description: faker.address.streetAddress()
            });
        }

        return items;

    }

    public getInitialMetadataDemoData = () => {
        var items = [];

        for (var i = 0; i < 5; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.internet.color()
            });
        }

        return items;
    }

    public getInitialUsersDemoData = () => {
        var items = [];

        for (var i = 0; i < 5; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.name.findName(),
            });
        }

        return items;
    }

    public getInitialChoicesDemoData = () => {
        var items = [];

        for (var i = 0; i < 5; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.system.fileType()
            });
        }

        return items;
    }


    public getInitialMetadataMultiDemoData = () => {
        var items = [];

        for (var i = 0; i < 5; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.finance.currencyName()
            });
        }

        return items;
    }


    public getInitialChoicesMultiDemoData = () => {
        var items = [];

        for (var i = 0; i < 5; i++) {
            items.push({
                id: faker.random.uuid(),
                title: faker.date.weekday()
            });
        }

        return items;
    }

    @action
    public init = () => {
     //   this.lookups = this.getInitialLookupDemoData();
    //    this.metadata = this.getInitialMetadataDemoData();
        this.items = this.getInitialDemoData();
        
    }

    @action
    public saveItem = (item) => {
        this.items.push(item);
    }


    @action
    public saveAction = (item) => {
        this.lookups.push(item);
        return item;
    }

    @action
    public saveOption = (item) => {
        this.metadataMulti.push(item);
    }

    @action
    public getItem = (id) => {
        return this.items.find(g => g.id == id);
    }

    @action
    public getItemsSorted = (field, ascending) => {
        return this.items.sort((a, b) => {
            if (ascending) {
                return a[field].localeCompare(b[field]);
            }

            return b[field].localeCompare(a[field]);
            
        });
    }

    @action
    public updateItem = (item) => {
        console.log(item);
        this.items.splice(this.items.findIndex(g => g.id == item.id), 1, item);
    }

    @action
    public getFieldValue = (field, itemId) => {
        const item = this.items.find(a => a.id == itemId);

        return item[field];
    }

    @action
    public getView = (view) => {
      //  return this.items.slice(0, 100);

        return this.items;
    }

    @action
    public getDynamicView = (offset) => {
        console.log(offset);
        let month = moment().add(offset, "months");
        console.log(month.toISOString());
        return this.items.filter(a => month.isSame(a.date, "month"));
    }

    @action
    public getNextPage = (page) => {
        //(page - 1 * 20)

        var start = ((page - 1) * 100);
        var end = start + 100;
        return this.items.slice(start, end);
   //     console.log(page);
    //    return [];
      //  return this.items;
    }

    @action
    public getFiltered = (metadata: any[]) => {
        return this.items.filter(g => metadata.indexOf(g.metadata.id) > -1);
    }


    @action
    public getFilterOptions = () => {
        return this.metadata;
    }


    @action
    public getLookups = () => {
        return this.lookups;
    }

    @action
    public getMetadata = () => {
        return this.metadata;
    }


    @action
    public deleteItem = (item) => {
        console.log(item);

        this.items = this.items.filter(d => d.id != item.id);
    }

    @action
    public searchLookup = (search) => {
        return this.lookups.filter(t => t.title.indexOf(search) > -1);
    }

    @action
    public search = (search) => {
        return this.items.filter(t => t.name.indexOf(search) > -1);
    }

    @observable
    public items: any[];


    @observable
    public users: any[];

    @observable
    public lookups: any[];

    @observable
    public metadata: any[];

    @observable
    public metadataMulti: any[];

    @observable
    public choices: any[];

    @observable
    public choiceMulti: any[];

    @computed
    get viewItemActions(): IModernAction[] {
        return [{ name: "Action", type: ModernActionType.custom, key: "1" },
            { name: "Action Hotmail only", type: ModernActionType.custom, key: "2" },
            { name: "Form Action", type: ModernActionType.form, key: "3", redirectUrl: "http://nu.nl" }];
    }

    @computed
    get views(): IModernView[] {
        return [
            {
                key: "1",
                name: "View 1",
                actions: [{ name: "Action 1", key: "1", type: ModernActionType.custom, selectionMode: SelectionMode.none },
                    { name: "Action 3", key: "3", type: ModernActionType.custom, selectionMode: SelectionMode.single },
                    { name: "Action 4", key: "4", type: ModernActionType.custom, selectionMode: SelectionMode.multiple },
                    { name: "Form Action", key: "5", type: ModernActionType.form, selectionMode: SelectionMode.multiple }],
                fields: [this.demoFieldData[1], this.demoFieldData[2], this.demoFieldData[3], this.demoFieldData[4],
                    this.demoFieldData[11], this.demoFieldData[12], this.demoFieldData[13], this.demoFieldData[20]]
            },
            {
                key: "2",
                name: "View 2",
                actions: [{ name: "Action 2", type: ModernActionType.custom, key: "2" }],
                fields: [this.demoFieldData[1], this.demoFieldData[5], this.demoFieldData[6], this.demoFieldData[7],
                    this.demoFieldData[14], this.demoFieldData[15], this.demoFieldData[16]]
            },
            {
                key: "3",
                name: "View 3",
                fields: [this.demoFieldData[1], this.demoFieldData[17], this.demoFieldData[18], this.demoFieldData[21] ]
            },         
            {
                key: "4",
                name: "Dynamic view",
                isDynamicView: true,
                fields: [this.demoFieldData[1], this.demoFieldData[8], this.demoFieldData[3], this.demoFieldData[4], this.demoFieldData[5]]
            }
        ];
    }


    @computed
    get demoNewFieldGroupsData(): IModernFieldGroup[] {
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
    }

    @computed
    get demoViewFieldGroupsData(): IModernFieldGroup[] {
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
    }

    @computed
    get demoFieldData(): IModernField[] {
        return [{
            key: "id",
            name: "Id",
            type: ModernFieldType.text,
            required: true
        }, {
                key: "name",
                name: "Name",
                type: ModernFieldType.text,
                required: true,
                sortable: true,
                editGroupTrigger: true
            }, {
                key: "email",
                name: "Email",
                sortable: true,
                type: ModernFieldType.email,
                embeddedFields: [{
                    key: "phone",
                    name: "Phone",
                    type: ModernFieldType.phone,
                }]
            }, {
                key: "phone",
                sortable: true,
                name: "Phone",
                type: ModernFieldType.phone,
            }, {
                key: "files",
                name: "Files",
                type: ModernFieldType.file,
                description: "Drop your files here"
            }, {
                key: "login",
                sortable: true,
                name: "Login",
                type: ModernFieldType.login,
                domain: faker.internet.domainName()
            }, {
                key: "percent",
                name: "Percent",
                editGroupTrigger: true,
                type: ModernFieldType.percent
            }, {
                key: "async",
                name: "Async",
                asyncValue: true,
                type: ModernFieldType.currency,
            }, {
                key: "date",
                name: "Date",
                type: ModernFieldType.dateTime
            }, {
                key: "choice",
                name: "Choice",
                type: ModernFieldType.choice,
                options: this.choices,
                action: {
                    name: "Custom",
                    type: ModernActionType.custom,
                    key: "Custom"
                }
            }, {
                key: "choicemulti",
                name: "Choice multi",
                multiSelect: true,
          //      editGroupTrigger: true,
                type: ModernFieldType.choice,
                options: this.choiceMulti
            }, {
                key: "lookup",
                name: "Lookup",
                type: ModernFieldType.lookup
            }, {
                key: "lookupmulti",
                name: "Lookup multi",
                multiSelect: true,
                hideInViewForm: true,
           
                type: ModernFieldType.lookup
            }, {
                key: "metadata",
              //  editGroupTrigger: true,
                name: "Metadata",
                filterable: true,
                type: ModernFieldType.managedMetadata,
                options: this.metadata
            }, {
                key: "metadatamulti",
                editGroupTrigger: true,
                name: "Metadata multi",
                newOptionItems: true,
                multiSelect: true,
                type: ModernFieldType.managedMetadata,
                options: this.metadataMulti
            }, {
                key: "user",
                editGroupTrigger: true,
                name: "User",
                type: ModernFieldType.user,
            //    options: this.metadataMulti
            }, {
                key: "multiline",
                name: "Multiline",
                type: ModernFieldType.multiLine
            }, {
                key: "jobTitle",
                name: "Job title",
                type: ModernFieldType.text,
            }, {
                key: "jobType",
                name: "Job type",
                readOnly: true,
                type: ModernFieldType.text,
            }, {
                key: "image",
                name: "Image",
                type: ModernFieldType.image,
            }, {
                key: "created",
                name: "Created",
                type: ModernFieldType.dateTime,
                asTimeAgo: true,
                readOnly: true
            }, {
                key: "boolean",
                name: "Boolean",
                type: ModernFieldType.boolean
            }];
    }
}