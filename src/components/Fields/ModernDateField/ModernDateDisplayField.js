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
var moment = require("moment");
var ModernDateDisplayField = /** @class */ (function (_super) {
    __extends(ModernDateDisplayField, _super);
    function ModernDateDisplayField(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.language == "nl-NL") {
            moment.locale('nl');
        }
        return _this;
    }
    ModernDateDisplayField.prototype.render = function () {
        var result = React.createElement("span", null);
        if (this.props.value) {
            var tooltip = moment(this.props.value).format("ddd D MMM YYYY");
            if (this.props.asTimeAgo) {
                //   result = <TimeAgo date={new Date(this.props.value)} title={tooltip} />;
                result = React.createElement("span", null, moment(this.props.value).fromNow());
            }
            else {
                result = React.createElement("span", null, moment(this.props.value).format("ddd D MMM YYYY"));
            }
        }
        return (React.createElement("span", null, result));
    };
    ModernDateDisplayField = __decorate([
        mobx_react_1.observer
    ], ModernDateDisplayField);
    return ModernDateDisplayField;
}(React.Component));
exports.ModernDateDisplayField = ModernDateDisplayField;
//# sourceMappingURL=ModernDateDisplayField.js.map