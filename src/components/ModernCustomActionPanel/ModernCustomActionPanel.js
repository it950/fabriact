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
var ModernCustomActionPanelState_1 = require("./ModernCustomActionPanelState");
var mobx_1 = require("mobx");
var ModernItemPanel_1 = require("../ModernItemPanel");
var ModernCustomActionPanel = /** @class */ (function (_super) {
    __extends(ModernCustomActionPanel, _super);
    function ModernCustomActionPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.config = new ModernCustomActionPanelState_1.default(_this.props.item, _this.props.onDismiss, _this.props.language);
        mobx_1.reaction(function () { return _this.props.item; }, function (item) {
            _this.config.item = item;
        });
        return _this;
    }
    ModernCustomActionPanel.prototype.render = function () {
        var html = this.props.action != null ? this.props.renderCustomAction(this.props.action) : React.createElement("span", null);
        return (React.createElement(ModernItemPanel_1.ModernItemPanel, { item: this.props.item, isVisible: this.props.isVisible, titleProperty: this.props.titleProperty, descriptionProperty: this.props.descriptionProperty, onDismiss: this.props.onDismiss, secondaryDescriptionProperty: this.props.secondaryDescriptionProperty, colorProperty: this.props.colorProperty, imageProperty: this.props.imageProperty }, html));
    };
    ModernCustomActionPanel = __decorate([
        mobx_react_1.observer
    ], ModernCustomActionPanel);
    return ModernCustomActionPanel;
}(React.Component));
exports.ModernCustomActionPanel = ModernCustomActionPanel;
//# sourceMappingURL=ModernCustomActionPanel.js.map