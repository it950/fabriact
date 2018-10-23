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
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var moment = require("moment");
exports.DayPickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    shortDays: [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
    ],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year'
};
var ModernDatePicker = /** @class */ (function (_super) {
    __extends(ModernDatePicker, _super);
    function ModernDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.selectDate = function (date) {
            _this.props.onChange(date != null ? moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]).toDate() : null);
        };
        return _this;
    }
    ModernDatePicker.prototype.render = function () {
        var value = this.props.value != null ? new Date(this.props.value) : null;
        // placeholder={this.props.placeholder}
        return (React.createElement(DatePicker_1.DatePicker, { onSelectDate: this.selectDate, firstDayOfWeek: DatePicker_1.DayOfWeek.Monday, strings: exports.DayPickerStrings, value: value }));
    };
    ModernDatePicker = __decorate([
        mobx_react_1.observer
    ], ModernDatePicker);
    return ModernDatePicker;
}(React.Component));
exports.ModernDatePicker = ModernDatePicker;
//# sourceMappingURL=ModernDatePicker.js.map