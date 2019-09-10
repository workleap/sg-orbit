import { DatePickerCalendar } from "../date-picker-calendar";
import { DayPickerSingleDateController } from "react-dates";
import { POSITIONS } from "../positions";
import { PureComponent, cloneElement } from "react";
import { bool, func, node, oneOf, oneOfType, string } from "prop-types";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class SingleDatePickerCalendar extends PureComponent {
    static propTypes = {
        date: momentType,
        onDateChange: func,
        onApply: func,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        position: oneOf(POSITIONS),
        navPrevIcon: node,
        navNextIcon: node,
        buttons: node,
        allowClear: bool,
        clearText: string,
        applyText: string,
        className: string
    };

    state = {
        focused: true
    };

    getInitialDate() {
        const { date } = this.props;

        return date || moment();
    }

    handleDateChange = date => {
        const { onDateChange } = this.props;

        onDateChange(date, this.props);
    };


    handleFocusChange = ({ focused }) => {
        this.setState({ focused });
    }

    handleClear = () => {
        const { onDateChange } = this.props;

        // this.resetFocusedInput();
        onDateChange(null, this.props);
    };

    handleApply = event => {
        const { onApply } = this.props;

        // this.resetFocusedInput();
        onApply(event, this.props);
    };

    renderButtons() {
        const { date, allowClear, buttons, clearText, applyText } = this.props;

        return cloneElement(buttons, {
            date,
            onClear: this.handleClear,
            onApply: this.handleApply,
            allowClear,
            clearText,
            applyText
        });
    }

    renderCalendar() {
        const { date } = this.props;
        const { focused } = this.state;

        return (
            <DayPickerSingleDateController
                date={date}
                // TODO: might want to hardcode it to true.
                focused={focused}
                onDateChange={this.handleDateChange}
                onFocusChange={this.handleFocusChange}
            />
        );
    }

    render() {
        const { minDate, maxDate, initialVisibleMonth, position, navPrevIcon, navNextIcon, className } = this.props;

        return (
            <DatePickerCalendar
                calendar={this.renderCalendar()}
                buttons={this.renderButtons()}
                minDate={minDate}
                maxDate={maxDate}
                initialDate={this.getInitialDate()}
                initialVisibleMonth={initialVisibleMonth}
                position={position}
                navPrevIcon={navPrevIcon}
                navNextIcon={navNextIcon}
                className={className}
            />
        );
    }
}
