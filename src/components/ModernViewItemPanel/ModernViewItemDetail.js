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
var ModernViewItemDetailState_1 = require("./ModernViewItemDetailState");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var ModernViewItemDetail = /** @class */ (function (_super) {
    __extends(ModernViewItemDetail, _super);
    function ModernViewItemDetail(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernViewItemDetailState_1.default(_this.props.item, _this.props.authorProperty, _this.props.editorProperty, _this.props.createdProperty, _this.props.modifiedProperty, _this.props.language);
        return _this;
    }
    ModernViewItemDetail.prototype.render = function () {
        var fields = this.config.labels.map(function (field, index) {
            //var value = this.props.item ? this.props.item[field.key] : null;
            return React.createElement(Label_1.Label, { key: field }, field);
        });
        return (React.createElement("div", { className: "ms-Grid-row", style: { paddingTop: "20px" } },
            React.createElement("div", { className: "ms-Grid-col ms-sm12  " },
                React.createElement("div", { className: "ms-Grid" }, fields))));
    };
    ModernViewItemDetail = __decorate([
        mobx_react_1.observer
    ], ModernViewItemDetail);
    return ModernViewItemDetail;
}(React.Component));
exports.ModernViewItemDetail = ModernViewItemDetail;
//# sourceMappingURL=ModernViewItemDetail.js.map