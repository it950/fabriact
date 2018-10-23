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
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var __1 = require("..");
var ModernChoiceEditField = /** @class */ (function (_super) {
    __extends(ModernChoiceEditField, _super);
    function ModernChoiceEditField(props) {
        var _this = _super.call(this, props) || this;
        //private updateItem = (value) => {
        //    var result = null;
        //    console.log(value);
        //    if (!this.props.field.multiSelect) {
        //        result = value.key;
        //    }
        //    else {
        //        result = this.props.value;
        //        if (value.selected) {
        //            if (this.props.value) {
        //                result.push(value.key);
        //            }
        //            else {
        //                result = [value.key];
        //            }
        //        }
        //        else {
        //            result.splice(result.indexOf(value.key), 1);
        //        }
        //    }
        //    console.log("UPDATE WITH");
        //    console.log(result);
        //    this.props.onChange(this.props.field.key, result);
        //}
        _this.updateItem = function (value) {
            console.log(value);
            if (_this.props.field.multiSelect) {
                if (_this.props.value && _this.props.value.length > 0 && _this.props.value.filter(function (e) { return e.id == value.key; }).length > 0) {
                    //this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key).map(v => {
                    //    return { title: v.text, id: v.key };
                    //}));
                    _this.props.onChange(_this.props.field.key, _this.props.value.filter(function (r) { return r.id != value.key; }));
                }
                else {
                    var results = _this.props.value ? _this.props.value : [];
                    results.push({ title: value.text, id: value.key });
                    //this.props.onChange(this.props.field.key, results.map(v => {
                    //    return { title: v.text, id: v.key };
                    //}));
                    _this.props.onChange(_this.props.field.key, results);
                }
            }
            else {
                if (_this.props.value && _this.props.value.id == value.key) {
                    _this.props.onChange(_this.props.field.key, null);
                }
                else {
                    //  var newValue = this.props.values.push(value);
                    _this.props.onChange(_this.props.field.key, { title: value.text, id: value.key });
                }
            }
            //this.props.updateItem(this.props.fieldName, { id: value.id, title: value.title });
            //    return value;
        };
        _this.updateItem3 = function (value) {
            // this.props.onChange(this.props.field.key, value);
            return value;
        };
        _this.getErrorMessage = function (value) {
            return _this.props.validate(_this.props.field, value);
        };
        _this.modernLookupFieldToDropdownOptionMapping = function (modernLookupField) {
            var persona = {
                //  title: modernLookupField.title,
                key: modernLookupField.id,
                //  imageUrl: modernLookupField.image,
                // secondaryText: modernLookupField.secondaryText,
                text: modernLookupField.title,
            };
            return persona;
        };
        return _this;
    }
    ModernChoiceEditField.prototype.render = function () {
        var _this = this;
        console.log(this.props);
        var options = this.props.field.options.map(function (c) { return _this.modernLookupFieldToDropdownOptionMapping(c); });
        //defaultSelectedKeys={toJS(this.props.value)}
        // defaultSelectedKey={this.props.value}
        var field = React.createElement("span", null);
        if (this.props.field.multiSelect) {
            var keys = this.props.value ? this.props.value.map(function (i) { return i.id; }) : [];
            field = React.createElement(Dropdown_1.Dropdown, { multiSelect: true, onChanged: this.updateItem, options: options, defaultSelectedKeys: keys });
        }
        else {
            var key = this.props.value ? this.props.value.id : null;
            field = React.createElement(Dropdown_1.Dropdown, { onChanged: this.updateItem, options: options, defaultSelectedKey: key });
        }
        //        this.props.value ? this.props.value.map(i => i.id)
        //onGetErrorMessage={this.getErrorMessage} errorMessage={this.props.errorMessage}
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            field));
    };
    ModernChoiceEditField = __decorate([
        mobx_react_1.observer
    ], ModernChoiceEditField);
    return ModernChoiceEditField;
}(React.Component));
exports.ModernChoiceEditField = ModernChoiceEditField;
//# sourceMappingURL=ModernChoiceEditField.js.map