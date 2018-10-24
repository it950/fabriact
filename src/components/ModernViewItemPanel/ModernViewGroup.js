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
require("./ModernViewGroup.module.css");
var Fields_1 = require("../Fields");
var ModernFieldLabel_1 = require("../Fields/ModernFieldLabel");
var ModernViewGroupFieldButton_1 = require("./ModernViewGroupFieldButton");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var ModernViewGroup = /** @class */ (function (_super) {
    __extends(ModernViewGroup, _super);
    function ModernViewGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.onGroupEdit = function () {
            _this.props.onEditClicked(_this.props.id);
        };
        return _this;
    }
    ModernViewGroup.prototype.render = function () {
        var _this = this;
        var fields = this.props.item != null ? this.props.fields.map(function (field, index) {
            return React.createElement("div", { className: "ms-Grid-row", key: field.key },
                React.createElement("div", { className: "ms-Grid-col ms-sm4" },
                    React.createElement(ModernFieldLabel_1.ModernFieldLabel, { label: field.name })),
                React.createElement("div", { className: "ms-Grid-col ms-sm6" },
                    React.createElement(Label_1.Label, null,
                        React.createElement(Fields_1.ModernDisplayField, { item: _this.props.item, field: field, placeholderImage: _this.props.placeholderImage, onGetFieldValue: _this.props.onGetFieldValue, language: _this.props.language }))),
                React.createElement("div", { className: "ms-Grid-col ms-sm2" },
                    React.createElement(ModernViewGroupFieldButton_1.ModernViewGroupFieldButton, { field: field, onActionClicked: _this.props.onActionClicked, language: _this.props.language, onEditClicked: _this.onGroupEdit, onMoreClicked: _this.props.onMoreClicked })));
        }) : React.createElement("span", null);
        return (React.createElement("div", { className: "ms-Grid-row viewGroup" },
            React.createElement("div", { className: "ms-Grid-col ms-sm12  " },
                React.createElement("div", { className: "ms-Grid" }, fields))));
    };
    ModernViewGroup = __decorate([
        mobx_react_1.observer
    ], ModernViewGroup);
    return ModernViewGroup;
}(React.Component));
exports.ModernViewGroup = ModernViewGroup;
//# sourceMappingURL=ModernViewGroup.js.map