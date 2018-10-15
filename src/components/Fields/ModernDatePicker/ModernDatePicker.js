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
const DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
const moment = require("moment");
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
let ModernDatePicker = class ModernDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.selectDate = (date) => {
            this.props.onChange(date != null ? moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]).toDate() : null);
        };
    }
    render() {
        var value = this.props.value != null ? new Date(this.props.value) : null;
        // placeholder={this.props.placeholder}
        return (React.createElement(DatePicker_1.DatePicker, { onSelectDate: this.selectDate, firstDayOfWeek: DatePicker_1.DayOfWeek.Monday, strings: exports.DayPickerStrings, value: value }));
    }
};
ModernDatePicker = __decorate([
    mobx_react_1.observer
], ModernDatePicker);
exports.ModernDatePicker = ModernDatePicker;
//# sourceMappingURL=ModernDatePicker.js.map