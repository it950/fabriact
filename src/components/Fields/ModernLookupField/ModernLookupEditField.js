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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var __1 = require("..");
var ModernLookupEditField = /** @class */ (function (_super) {
    __extends(ModernLookupEditField, _super);
    function ModernLookupEditField(props) {
        var _this = _super.call(this, props) || this;
        _this.updateItem = function (items) {
            if (_this.props.field.multiSelect) {
                _this.props.onChange(_this.props.field.key, items.map(function (t) {
                    return {
                        id: t.id, title: t.title
                    };
                }));
            }
            else {
                if (items.length > 0) {
                    _this.props.onChange(_this.props.field.key, { id: items[0].id, title: items[0].title });
                }
                else {
                    _this.props.onChange(_this.props.field.key, null);
                }
            }
        };
        //private updateItem = (value) => {
        //    this.props.onChange(this.props.field.key, value);
        //    return value;
        //}
        _this.getErrorMessage = function (value) {
            _this.props.validate(_this.props.field, value);
        };
        _this.modernLookupFieldToPersonaMapping = function (modernLookupField) {
            var persona = {
                title: modernLookupField.title,
                id: modernLookupField.id,
                imageUrl: modernLookupField.image,
                secondaryText: modernLookupField.secondaryText,
                text: modernLookupField.title,
            };
            return persona;
        };
        _this._onFocus = function (items) {
            if (_this.props.resolveSuggestions) {
                return rxjs_1.from(_this.props.resolveSuggestions()).pipe(operators_1.map(function (t) {
                    return t.filter(function (v) { return _this.props.value == null || _this.props.value.find(function (k) { return k.id == v.id; }) == null; }).map(function (v) {
                        return _this.modernLookupFieldToPersonaMapping(v);
                    });
                })).toPromise();
            }
            else {
                return [];
            }
        };
        _this._validateInput = function (input) {
            if (input.indexOf('@') !== -1) {
                return Pickers_1.ValidationState.valid;
            }
            else if (input.length > 1) {
                return Pickers_1.ValidationState.warning;
            }
            else {
                return Pickers_1.ValidationState.invalid;
            }
        };
        _this._onFilterChanged = function (filterText, currentPersonas, limitResults) {
            if (filterText) {
                return rxjs_1.from(_this.props.resolveLookup(filterText)).pipe(operators_1.map(function (t) {
                    console.log(t);
                    return t.filter(function (v) { return _this.props.value == null || _this.props.value.find(function (k) { return k.id == v.id; }) == null; }).map(function (v) {
                        return _this.modernLookupFieldToPersonaMapping(v);
                    });
                })).toPromise();
            }
            else {
                return [];
            }
        };
        return _this;
    }
    ModernLookupEditField.prototype.render = function () {
        var _this = this;
        var itemLimit = this.props.field.multiSelect ? 100 : 1;
        var values = this.props.field.multiSelect ? (this.props.value != null && this.props.value.length > 0) ? this.props.value.map(function (v) {
            return _this.modernLookupFieldToPersonaMapping(v);
        }) : [] : this.props.value != null ? [this.modernLookupFieldToPersonaMapping(this.props.value)] : [];
        var picker = React.createElement(Pickers_1.NormalPeoplePicker, { defaultSelectedItems: values, onValidateInput: this._validateInput, onEmptyInputFocus: this._onFocus, itemLimit: itemLimit, resolveDelay: 500, onResolveSuggestions: this._onFilterChanged, onChange: this.updateItem });
        return (React.createElement("span", null,
            React.createElement(__1.ModernFieldLabel, { required: this.props.field.required, label: this.props.field.name }),
            picker));
    };
    ModernLookupEditField = __decorate([
        mobx_react_1.observer
    ], ModernLookupEditField);
    return ModernLookupEditField;
}(React.Component));
exports.ModernLookupEditField = ModernLookupEditField;
//# sourceMappingURL=ModernLookupEditField.js.map