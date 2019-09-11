import { InlineSingleDatePickerInput } from "./inline-single-date-picker-input";
import { PureComponent } from "react";
import { SingleDatePicker } from "./single-date-picker";
import { SingleDatePickerButtons } from "./single-date-picker-buttons";
import { SingleDatePickerCalendar } from "./single-date-picker-calendar";

// TODO: might need to duplicate all the SingleDatePicker props here to make sure the docs generate the prop tables. Or we might redirect to the SingleDatePicker docs.
export class InlineSingleDatePicker extends PureComponent {
    // Expose sub-components.
    static Input = InlineSingleDatePickerInput;
    static Calendar = SingleDatePickerCalendar;
    static Buttons = SingleDatePickerButtons;

    render() {
        return (
            <SingleDatePicker
                input={<InlineSingleDatePickerInput />}
                {...this.props}
            />
        );
    }
}
