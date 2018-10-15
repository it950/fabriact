import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDatePickerProps } from './IModernDatePickerProps';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import * as moment from 'moment';

export const DayPickerStrings: IDatePickerStrings = {
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



@observer
export class ModernDatePicker extends React.Component<IModernDatePickerProps, any> {


    constructor(props: IModernDatePickerProps) {
        super(props);
    }

    private selectDate = (date) => {
        this.props.onChange(date != null ? moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]).toDate() : null);
    }

    render() {
        var value = this.props.value != null ? new Date(this.props.value) : null;
        // placeholder={this.props.placeholder}
        return (
            <DatePicker
                onSelectDate={this.selectDate}
                firstDayOfWeek={DayOfWeek.Monday}
                strings={DayPickerStrings}
               
                value={value}
            />
        );
    }
}