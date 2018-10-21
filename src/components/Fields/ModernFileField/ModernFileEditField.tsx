import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFileEditFieldProps } from './IModernFileEditFieldProps';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import Dropzone from 'react-dropzone';
import { Observable, concat } from 'rxjs';
import { ModernFieldLabel } from '..';
import './ModernFileEditField.module.css';


@observer
export class ModernFileEditField extends React.Component<IModernFileEditFieldProps, any> {

    constructor(props: IModernFileEditFieldProps) {
        super(props);
    }

    //private onChange = (items) => {
    //    this.updateItem(items.map(t => {
    //        return {
    //            PsaId: t.id, PsaTitle: t.text
    //        };
    //    }));

    //}

    private onRemove = (items) => {
        this.updateItem(items.map(t => {
            return {
                id: t.id,
                title: t.text,
                file: t.file
              //  base64: t.base64
            };
        }));
        //this.updateItem(items.map(t => {
        //    return {
        //        PsaId: t.id, PsaTitle: t.text
        //    };
        //}));

    }

    private addFiles = (files) => {
        let newValue = this.props.value ? this.props.value.concat(files) : files;
        this.updateItem(newValue);
        //this.props.onChange(this.props.field.key, value);
        //return value;
    }


    private updateItem = (value) => {
        this.props.onChange(this.props.field.key, value);
        return value;
    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }


    private readFile = (file: File) => {
        return new Observable((obs) => {
            console.log(file);
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                console.log(fileAsBinaryString);
                obs.next({ base64: fileAsBinaryString, id: file.name, title: file.name});
                obs.complete();

            };

            reader.readAsDataURL(file);
        });
    }

    private readFiles = (files: File[]) => {
        return new Observable((obs) => {

            var results = [];
            var item = files.map(d => this.readFile(d));
            concat(...item).subscribe((data) => {
                results.push(data);
            }, (error) => {
                console.error(error);
            }, () => {
                obs.next(results);
                obs.complete();
            });

        });
    }

    private onDrop = (files) => {
        this.addFiles(files.map(v => {
            return {
                id: v.name,
                title: v.name,
                file: v,
            }
        }));

    }
    private onDrop2 = (files) => {
        this.readFiles(files).subscribe((d: any[]) => {
            this.addFiles(d);
            if (this.props.value != null) {
             //   this.onChange(this.props.value.concat(d));
            }
            else {
           //     this.onChange(d);
            }
        });

    }

    render() {

        var selectedFiles = <span></span>;

        if (this.props.value && this.props.value.length > 0) {
            var selectedItems = this.props.value.map(t => {
                return {
              //      base64: t.base64,
                    file: t.file,
                    text: t.title,
                    id: t.id
                };
            });

            selectedFiles = this.props.value ? <NormalPeoplePicker itemLimit={selectedItems.length} selectedItems={selectedItems}
                onChange={this.onRemove} onResolveSuggestions={() => {
                return [];
            }}  ></NormalPeoplePicker> : <span></span>;

        }

        var field = <div> <div className={"modernDropZone"}><Dropzone activeClassName={"ms-borderColor-themePrimary"} onDrop={this.onDrop}>
            <p className={"modernInputFieldText"}> {this.props.field.description}</p>
        </Dropzone>
        </div>
            {selectedFiles}
        </div>;

        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {field}
            </span>
        );

    }
}