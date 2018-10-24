import * as React from 'react';
import * as ReactDom from 'react-dom';
//import { ModernOfficeList } from './src/components/ModernOfficeList/ModernOfficeList';
import { ModernOfficeList, IModernFieldGroup, ModernFieldType, IModernLookup } from './src';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import 'office-ui-fabric-react/dist/css/fabric.css';
import ExampleData from './ExampleData';
import { setTimeout } from 'timers';
import { observer } from 'mobx-react';
import { observable, computed, action, toJS } from 'mobx';

initializeIcons(/* optional base url */);

@observer
class Demo extends React.Component {


    exampleData: ExampleData;

    @observable
    public currentPage = 1;

    @computed
    get hasNextPage() {
        return false;
    }

    @observable
    itemActions = [];

    constructor(props) {
        super(props);

        this.exampleData = new ExampleData();
        this.itemActions = this.exampleData.viewItemActions;

    }

    private delay = (callback) => {
        setTimeout(() => {
            callback();
        }, 1200);
    }


    private getNewActionItem = (fieldId, items): Promise<any> => {
        console.log(items);
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.newActionItem());
                //resolve(this.exampleData.newItem());
            });
        });
    }

    private getNewActionFieldGroups = (fieldId, items): Promise<IModernFieldGroup[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve([{
                    id: "1",
                    description: "",
                    fields: [{
                        key: "id",
                        name: "Id",
                        type: ModernFieldType.text,
                        required: true
                    }, {
                        key: "title",
                        name: "Title",
                        type: ModernFieldType.text,
                        required: true,
                        }, {
                            key: "description",
                            name: "Description",
                            type: ModernFieldType.text
                        }]
                }]);
                //resolve(this.exampleData.newItem());
            });
        });
    }

    private onSaveNewAction = (item): Promise<any> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(toJS(this.exampleData.saveAction(item)));
            });
        });
    }



    private getNewOptionItem = (fieldId): Promise<any> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.newOptionItem());
                //resolve(this.exampleData.newItem());
            });
        });
    }

    private getNewOptionFieldGroups = (fieldId): Promise<IModernFieldGroup[]> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve([{
                    id: "1",
                    description: "",
                    fields: [{
                        key: "id",
                        name: "Id",
                        type: ModernFieldType.text,
                        required: true
                    }, {
                            key: "title",
                            name: "Title",
                            type: ModernFieldType.text,
                            required: true,
                        }]
                }]);
                //resolve(this.exampleData.newItem());
            });
        });
    }

    private onSaveNewOption = (item): Promise<IModernLookup[]> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                this.exampleData.saveOption(item);
                resolve(toJS(this.exampleData.metadataMulti));
            });
        });
    }

    private onNewItem = (): Promise<any> => {

        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.newItem());
            });
        });
    }

    private onSaveNewItem = (newItem): Promise<void> => {

        return new Promise((resolve, reject) => {
            console.log(newItem);
            this.delay(() => {
                this.exampleData.saveItem(newItem);
                resolve();
            });
        });
    
    }


    @action
    private onGetItem = (item): Promise<any> => {

        return new Promise((resolve, reject) => {
            console.log(item);
            this.delay(() => {
                this.itemActions = item.email && item.email.indexOf("hotmail.com") > -1 ? this.exampleData.viewItemActions : [this.exampleData.viewItemActions[0]];
                resolve(toJS(this.exampleData.getItem(item.id)));
            });
        });

    }


    private onSortChanged = (column, ascending): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            
            this.delay(() => {
                resolve(this.exampleData.getItemsSorted(column, ascending));
            });
        });

    }


    private onUpdateItem = (item): Promise<void> => {

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

    }

    private resolveLookup = (key, search): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.searchLookup(search));
            });
        });
    }

    private resolveSuggestions = (key): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.getLookups());
            });
        });
    }

    private getFilterOptions = (key): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.getFilterOptions());
            });
        });
    }

    private onFilterChanged = (filters): Promise<any[]> => {
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
    }

    private onViewChange = (key): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                const items = key == "4" ? this.exampleData.getDynamicView(0) : this.exampleData.getView(key);
                this.currentPage = 1;
                resolve(items);
             //   resolve(this.exampleData.getView(key));
            });
        });
    }

    private onViewOffsetChange = (offset): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                const items = this.exampleData.getDynamicView(offset);
                this.currentPage = 1;
                resolve(toJS(items));
                //   resolve(this.exampleData.getView(key));
            });
        });
    }

    private getFieldValue = (field, item): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(this.exampleData.getFieldValue(field, item.id));
            });
        });
    }


    @action
    private onExport = (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                resolve(toJS(this.exampleData.items));
            });
        });
    }


    @action
    private onNextPage = (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.delay(() => {
                const items = this.exampleData.getNextPage(this.currentPage + 1);
                this.currentPage++;
                resolve(items);
            });
        });
    }


    //private onViewActionClicked = (id, items): Promise<void> => {
    //    return new Promise((resolve, reject) => {
    //        alert("Action " + id + " clicked.");
    //        console.log(id);
    //        console.log(items);
    //        resolve();
    //       //     resolve(this.exampleData.search(search));
    //    });
    //}




    private onActionClicked = (id, items): Promise<void> => {
        return new Promise((resolve, reject) => {
        
            console.log(id);
            console.log(items);
            resolve();
            alert("Action " + id + " clicked.");
            //     resolve(this.exampleData.search(search));
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


    render() {

        return (
            <div>
                <ModernOfficeList views={this.exampleData.views} defaultView={"1"} onSearch={this.onSearch}
                    onViewChange={this.onViewChange} newItemGroups={this.exampleData.demoNewFieldGroupsData}
                    viewItemActions={this.itemActions} onExport={this.onExport}
                    getNewOptionFieldGroups={this.getNewOptionFieldGroups} getNewOptionItem={this.getNewOptionItem}
                    onSaveNewOption={this.onSaveNewOption}
                    placeholderImage={this.exampleData.placeholder}
                    viewItemGroups={this.exampleData.demoViewFieldGroupsData} onGetFieldValue={this.getFieldValue}
                    onNextPage={this.onNextPage} hasNextPage={this.hasNextPage} itemIdProperty={"id"}
                    onSaveNewItem={this.onSaveNewItem} onDeleteItem={this.onDelete} resolveLookup={this.resolveLookup}
                    resolveSuggestions={this.resolveSuggestions} language={"nl-NL"} onUpdateItem={this.onUpdateItem}
                    itemTitleProperty={"name"} itemSecondaryDescriptionProperty={"jobTitle"} onFilterChanged={this.onFilterChanged}
                    onSortChanged={this.onSortChanged} getFilterOptions={this.getFilterOptions}
                    itemColorProperty={"color"} onSaveNewAction={this.onSaveNewAction} getNewActionFieldGroups={this.getNewActionFieldGroups} getNewActionItem={this.getNewActionItem}
                    onViewOffsetChange={this.onViewOffsetChange} onGetItem={this.onGetItem} onActionClicked={this.onActionClicked}
                    itemDescriptionProperty={"jobType"} itemImageProperty={"image"} itemAuthorProperty={"author"} 
                    itemModifiedProperty={"modified"} itemCreatedProperty={"created"} itemEditorProperty={"editor"}
                    onNewItem={this.onNewItem} />
            </div>
            
        );
    }
}

ReactDom.render(<Demo />, document.getElementById('root'));