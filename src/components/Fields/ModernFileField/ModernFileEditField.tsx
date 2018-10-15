import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFileEditFieldProps } from './IModernFileEditFieldProps';
import { ModernEditFieldLabel } from '../ModernEditFieldLabel/ModernEditFieldLabel';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import Dropzone from 'react-dropzone';
import { Observable, concat } from 'rxjs';


@observer
export class ModernFileInputField extends React.Component<IModernFileEditFieldProps, any> {

    constructor(props: IModernFileEditFieldProps) {
        super(props);
    }

    private onChange = (items) => {
        this.updateItem(items.map(t => {
            return {
                PsaId: t.id, PsaTitle: t.text
            };
        }));

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

            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                obs.next({ PsaDescription: fileAsBinaryString, PsaTitle: file.name });
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
        this.readFiles(files).subscribe((d: any[]) => {
            if (this.props.value != null) {
                this.onChange(this.props.value.concat(d));
            }
            else {
                this.onChange(d);
            }
        });

    }

    render() {

        var selectedFiles = <span></span>;

        if (this.props.value && this.props.value.length > 0) {
            var selectedItems = this.props.value.map(t => {
                return {
                    id: t.PsaId,
                    text: t.PsaTitle,
                    key: t.PsaId
                };
            });

            selectedFiles = this.props.value ? <NormalPeoplePicker itemLimit={selectedItems.length} selectedItems={selectedItems}
                onChange={this.onChange} onResolveSuggestions={() => {
                return [];
            }}  ></NormalPeoplePicker> : <span></span>;

        }

        var field = <div> <div className={"styles.psaDropZone"}><Dropzone activeClassName={"ms-borderColor-themePrimary"} onDrop={this.onDrop}>
            <p className={"styles.psaInputFieldText"}> {this.props.field.description}</p>
        </Dropzone>
        </div>
            {selectedFiles}
        </div>;

        return (
            <span>
                <ModernEditFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {field}
            </span>
        );

    }
}