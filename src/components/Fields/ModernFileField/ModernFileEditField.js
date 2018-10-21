"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
const Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
const react_dropzone_1 = require("react-dropzone");
const rxjs_1 = require("rxjs");
const __1 = require("..");
require("./ModernFileEditField.module.css");
let ModernFileEditField = class ModernFileEditField extends React.Component {
    constructor(props) {
        super(props);
        //private onChange = (items) => {
        //    this.updateItem(items.map(t => {
        //        return {
        //            PsaId: t.id, PsaTitle: t.text
        //        };
        //    }));
        //}
        this.onRemove = (items) => {
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
        };
        this.addFiles = (files) => {
            let newValue = this.props.value ? this.props.value.concat(files) : files;
            this.updateItem(newValue);
            //this.props.onChange(this.props.field.key, value);
            //return value;
        };
        this.updateItem = (value) => {
            this.props.onChange(this.props.field.key, value);
            return value;
        };
        this.getErrorMessage = (value) => {
            return this.props.validate(this.props.field, value);
        };
        this.readFile = (file) => {
            return new rxjs_1.Observable((obs) => {
                console.log(file);
                const reader = new FileReader();
                reader.onload = () => {
                    const fileAsBinaryString = reader.result;
                    console.log(fileAsBinaryString);
                    obs.next({ base64: fileAsBinaryString, id: file.name, title: file.name });
                    obs.complete();
                };
                reader.readAsDataURL(file);
            });
        };
        this.readFiles = (files) => {
            return new rxjs_1.Observable((obs) => {
                var results = [];
                var item = files.map(d => this.readFile(d));
                rxjs_1.concat(...item).subscribe((data) => {
                    results.push(data);
                }, (error) => {
                    console.error(error);
                }, () => {
                    obs.next(results);
                    obs.complete();
                });
            });
        };
        this.onDrop = (files) => {
            this.addFiles(files.map(v => {
                return {
                    id: v.name,
                    title: v.name,
                    file: v,
                };
            }));
        };
        this.onDrop2 = (files) => {
            this.readFiles(files).subscribe((d) => {
                this.addFiles(d);
                if (this.props.value != null) {
                    //   this.onChange(this.props.value.concat(d));
                }
                else {
                    //     this.onChange(d);
                }
            });
        };
    }
    render() {
        var selectedFiles = React.createElement("span", null);
        if (this.props.value && this.props.value.length > 0) {
            var selectedItems = this.props.value.map(t => {
                return {
                    //      base64: t.base64,
                    file: t.file,
                    text: t.title,
                    id: t.id
                };
            });
            selectedFiles = this.props.value ? React.createElement(Pickers_1.NormalPeoplePicker, { itemLimit: selectedItems.length, selectedItems: selectedItems, onChange: this.onRemove, onResolveSuggestions: () => {
                    return [];
                } }) : React.createElement("span", null);
        }
        var field = React.createElement("div", null,
            " ",
            React.createElement("div", { className: "modernDropZone" },
                React.createElement(react_dropzone_1.default, { activeClassName: "ms-borderColor-themePrimary", onDrop: this.onDrop },
                    React.createElement("p", { className: "modernInputFieldText" },
                        " ",
                        this.props.field.description))),
            selectedFiles);
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            field));
    }
};
ModernFileEditField = __decorate([
    mobx_react_1.observer
], ModernFileEditField);
exports.ModernFileEditField = ModernFileEditField;
//# sourceMappingURL=ModernFileEditField.js.map