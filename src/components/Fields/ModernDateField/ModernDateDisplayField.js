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
const moment = require("moment");
let ModernDateDisplayField = class ModernDateDisplayField extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.language == "nl-NL") {
            moment.locale('nl');
        }
    }
    render() {
        var result = React.createElement("span", null);
        if (this.props.value) {
            let tooltip = moment(this.props.value).format("ddd D MMM YYYY");
            if (this.props.asTimeAgo) {
                //   result = <TimeAgo date={new Date(this.props.value)} title={tooltip} />;
                result = React.createElement("span", null, moment(this.props.value).fromNow());
            }
            else {
                result = React.createElement("span", null, moment(this.props.value).format("ddd D MMM YYYY"));
            }
        }
        return (React.createElement("span", null, result));
    }
};
ModernDateDisplayField = __decorate([
    mobx_react_1.observer
], ModernDateDisplayField);
exports.ModernDateDisplayField = ModernDateDisplayField;
//# sourceMappingURL=ModernDateDisplayField.js.map