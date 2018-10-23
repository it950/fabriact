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
var mobx_react_1 = require("mobx-react");
var Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
var react_dropzone_1 = require("react-dropzone");
var rxjs_1 = require("rxjs");
var __1 = require("..");
require("./ModernFileEditField.module.css");
var ModernFileEditField = /** @class */ (function (_super) {
    __extends(ModernFileEditField, _super);
    function ModernFileEditField(props) {
        var _this = _super.call(this, props) || this;
        //private onChange = (items) => {
        //    this.updateItem(items.map(t => {
        //        return {
        //            PsaId: t.id, PsaTitle: t.text
        //        };
        //    }));
        //}
        _this.onRemove = function (items) {
            _this.updateItem(items.map(function (t) {
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
        _this.addFiles = function (files) {
            var newValue = _this.props.value ? _this.props.value.concat(files) : files;
            _this.updateItem(newValue);
            //this.props.onChange(this.props.field.key, value);
            //return value;
        };
        _this.updateItem = function (value) {
            _this.props.onChange(_this.props.field.key, value);
            return value;
        };
        _this.getErrorMessage = function (value) {
            return _this.props.validate(_this.props.field, value);
        };
        _this.readFile = function (file) {
            return new rxjs_1.Observable(function (obs) {
                console.log(file);
                var reader = new FileReader();
                reader.onload = function () {
                    var fileAsBinaryString = reader.result;
                    console.log(fileAsBinaryString);
                    obs.next({ base64: fileAsBinaryString, id: file.name, title: file.name });
                    obs.complete();
                };
                reader.readAsDataURL(file);
            });
        };
        _this.readFiles = function (files) {
            return new rxjs_1.Observable(function (obs) {
                var results = [];
                var item = files.map(function (d) { return _this.readFile(d); });
                rxjs_1.concat.apply(void 0, item).subscribe(function (data) {
                    results.push(data);
                }, function (error) {
                    console.error(error);
                }, function () {
                    obs.next(results);
                    obs.complete();
                });
            });
        };
        _this.onDrop = function (files) {
            _this.addFiles(files.map(function (v) {
                return {
                    id: v.name,
                    title: v.name,
                    file: v,
                };
            }));
        };
        _this.onDrop2 = function (files) {
            _this.readFiles(files).subscribe(function (d) {
                _this.addFiles(d);
                if (_this.props.value != null) {
                    //   this.onChange(this.props.value.concat(d));
                }
                else {
                    //     this.onChange(d);
                }
            });
        };
        return _this;
    }
    ModernFileEditField.prototype.render = function () {
        var selectedFiles = React.createElement("span", null);
        if (this.props.value && this.props.value.length > 0) {
            var selectedItems = this.props.value.map(function (t) {
                return {
                    //      base64: t.base64,
                    file: t.file,
                    text: t.title,
                    id: t.id
                };
            });
            selectedFiles = this.props.value ? React.createElement(Pickers_1.NormalPeoplePicker, { itemLimit: selectedItems.length, selectedItems: selectedItems, onChange: this.onRemove, onResolveSuggestions: function () {
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
    };
    ModernFileEditField = __decorate([
        mobx_react_1.observer
    ], ModernFileEditField);
    return ModernFileEditField;
}(React.Component));
exports.ModernFileEditField = ModernFileEditField;
//# sourceMappingURL=ModernFileEditField.js.map