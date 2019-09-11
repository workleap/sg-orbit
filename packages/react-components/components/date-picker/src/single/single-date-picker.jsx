import { AutoControlledPureComponent, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { BOTTOM_LEFT, POSITIONS } from "../positions";
import { DatePicker } from "../date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";
import { SingleDatePickerInput } from "./single-date-picker-input";
import { arrayOf, bool, func, node, oneOf, oneOfType, string } from "prop-types";
import { cloneElement } from "react";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

// WAITING FOR: https://github.com/airbnb/react-dates/pull/1672
export class SingleDatePicker extends AutoControlledPureComponent {
    static propTypes = {
        date: momentType,
        defaultDate: momentType,
        onDateChange: func.isRequired,
        onVisibilityChange: func,
        allowClear: bool,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        input: node,
        inputIcon: node,
        disabledInputIcon: node,
        inputClearIcon: node,
        placeholder: string,
        dateFormat: string,
        position: oneOf(POSITIONS),
        offsets: arrayOf(string),
        calendar: node,
        navPrevIcon: node,
        navNextIcon: node,
        buttons: node,
        clearText: string,
        applyText: string,
        defaultOpen: bool,
        open: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        allowClear: true,
        input: <SingleDatePickerInput />,
        position: BOTTOM_LEFT,
        calendar: <SingleDatePickerCalendar />,
        buttons: <SingleDatePickerButtons />
    };

    static autoControlledProps = ["date", "open"];

    // Expose sub-components.
    static Input = SingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    state = {
        date: null,
        selectedDate: null,
        open: false,
        inputHeight: 0
    };

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SingleDatePicker.autoControlledProps, ({ date }) => ({
            selectedDate: date
        }));
    }

    handleInputHeightChange = value => {
        this.setState({ inputHeight: value });
    }

    handleInputToggleVisibility = event => {
        this.toggleCalendarVisibility(event);
    };

    handleInputClear = event => {
        const { onDateChange } = this.props;

        this.trySetAutoControlledStateValue({ date: null });
        this.setState({ selectedDate: null });

        onDateChange(event, null, this.props);
    };

    handlePopupClose = event => {
        const { date } = this.state;

        this.setState({ selectedDate: date });
        this.toggleCalendarVisibility(event);
    };

    handleCalendarDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleCalendarApply = event => {
        const { onDateChange } = this.props;
        const { selectedDate } = this.state;

        this.toggleCalendarVisibility(event);
        this.trySetAutoControlledStateValue({ date: selectedDate });

        onDateChange(event, selectedDate, this.props);
    };

    toggleCalendarVisibility(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        this.trySetAutoControlledStateValue({ open: !open });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, !open, this.props);
        }
    }

    renderInput() {
        const { input, inputIcon, inputClearIcon, disabledInputIcon, allowClear, placeholder, dateFormat, disabled } = this.props;
        const { selectedDate, open } = this.state;

        return cloneElement(input, {
            date: selectedDate,
            onToggleVisibility: this.handleInputToggleVisibility,
            onClear: this.handleInputClear,
            onHeightChange: this.handleInputHeightChange,
            allowClear,
            placeholder,
            dateFormat,
            icon: inputIcon,
            clearIcon: inputClearIcon,
            disabledIcon: disabledInputIcon,
            disabled: disabled,
            open: open
        });
    }

    renderCalendar() {
        const { allowClear, minDate, maxDate, initialVisibleMonth, position, calendar, navPrevIcon, navNextIcon, buttons, clearText, applyText } = this.props;
        const { selectedDate } = this.state;

        return cloneElement(calendar, {
            date: selectedDate,
            onDateChange: this.handleCalendarDateChange,
            onApply: this.handleCalendarApply,
            allowClear,
            minDate,
            maxDate,
            initialVisibleMonth,
            position,
            buttons,
            navPrevIcon,
            navNextIcon,
            clearText,
            applyText
        });
    }

    render() {
        const { position, offsets, disabled, className } = this.props;
        const { open, inputHeight } = this.state;

        return (
            <DatePicker
                input={this.renderInput()}
                calendar={this.renderCalendar()}
                open={open}
                inputHeight={inputHeight}
                onOutsideClick={this.handlePopupClose}
                onEscapeKeyDown={this.handlePopupClose}
                position={position}
                offsets={offsets}
                disabled={disabled}
                className={className}
            />
        );
    }
}
