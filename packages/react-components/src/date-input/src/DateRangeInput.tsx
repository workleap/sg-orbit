import "./DateRangeInput.css";

import { Box } from "../../box";
import { CalendarIcon, VerticalDotsIcon } from "../../icons";
import { ChangeEvent, ComponentProps, ElementType, ForwardedRef, KeyboardEvent, SyntheticEvent, useCallback, useImperativeHandle, useRef, useState } from "react";
import { CrossButton, IconButton } from "../../button";
import { Divider } from "../../divider";
import {
    InteractionStatesProps,
    Keys,
    augmentElement,
    cssModule,
    forwardRef,
    isNil,
    isNilOrEmpty,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocus,
    useControllableState,
    useEventCallback,
    useMergedRefs
} from "../../shared";
import { Item } from "../../collection";
import { Menu, MenuTrigger } from "../../menu";
import { useDateInput } from "./useDateInput";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface DatePreset {
    text: string;
    startDate: Date;
    endDate: Date;
}

export interface InnerDateRangeInputProps extends InteractionStatesProps {
    /**
     * @ignore
     */
    name?: string;
    /**
     * A controlled start date value.
     */
    startDate?: Date | null;
    /**
     * A controlled end date value.
     */
    endDate?: Date | null;
    /**
     * The initial value of start date.
     */
    defaultStartDate?: Date;
    /**
     * The initial value of end date.
     */
    defaultEndDate?: Date;
    /**
     * Temporary text that occupies both date inputs when they are empty.
     */
    placeholder?: string;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the date(s) are / is applied.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Object} startDate - Selected start date.
     * @param {Object} endDate - Selected end date.
     * @returns {void}
     */
    onDatesChange?: (event: SyntheticEvent, startDate: Date, endDate: Date) => void;
    /**
     * @ignore
     */
    onFocus?: (event: SyntheticEvent) => void;
    /**
     * @ignore
     */
    onBlur?: (event: SyntheticEvent) => void;
    /**
     * Array of pre-determined dates range.
     */
    presets?: DatePreset[];
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

const DateInput = forwardRef<any, "input">(({
    value,
    placeholder = "dd/mm/yyyy",
    required,
    validationState,
    min,
    max,
    onChange,
    onDateChange,
    autoFocus,
    disabled,
    readOnly,
    ...rest
}, ref) => {
    const inputRef = useMergedRefs(ref);

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus || disabled || readOnly,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const dateProps = useDateInput({
        value,
        min,
        max,
        onChange,
        onDateChange,
        forwardedRef: inputRef
    });

    return (
        <input
            {...mergeProps(
                rest,
                {
                    placeholder,
                    className: "o-ui-date-range-input-date-input",
                    type: "text",
                    disabled,
                    readOnly,
                    "aria-required": required ? true : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    ref: inputRef
                },
                dateProps
            )}
        />
    );
});

export function InnerDateRangeInput(props: InnerDateRangeInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        startDate: startDateProp,
        endDate: endDateProp,
        defaultStartDate,
        defaultEndDate,
        placeholder,
        min,
        max,
        required,
        validationState,
        onDatesChange,
        onFocus,
        onBlur,
        presets,
        autoFocus,
        fluid,
        disabled,
        readOnly,
        active,
        focus = false,
        hover,
        name,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const [startDate, setStartDate] = useControllableState(startDateProp, defaultStartDate, null);
    const [endDate, setEndDate] = useControllableState(endDateProp, defaultEndDate, null);
    const [hasFocus, setHasFocus] = useState(focus);

    const containerRef = useRef<HTMLElement>();
    const startDateRef = useRef<HTMLInputElement>();
    const endDateRef = useRef<HTMLInputElement>();

    useImperativeHandle(forwardedRef, () => {
        const element = containerRef.current;

        element.focus = () => {
            startDateRef.current?.focus();
        };

        return element;
    });

    const applyDates = useCallback((event: SyntheticEvent, newStartDate: Date, newEndDate: Date) => {
        if (startDate !== newStartDate || endDate !== newEndDate) {
            if (!isNil(onDatesChange)) {
                onDatesChange(event, newStartDate, newEndDate);
            }

            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }
    }, [onDatesChange, startDate, setStartDate, endDate, setEndDate]);

    const handleStartDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(endDate) && newDate > endDate) {
            newDate = endDate;
        }

        applyDates(event, newDate, endDate);

        if (!isNil(newDate)) {
            endDateRef.current?.focus();
        }
    });

    const handleEndDateInputValueChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newCharacter = event.nativeEvent.data;

        // If the new character is not a digit, we don't want to do anything since the new character will be removed by the mask input.
        // The digit is test with a regex because this is how our mask input third party is doing it and we want to be consistant.
        if (/\d/.test(newCharacter)) {
            if (isNilOrEmpty(event.target.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const handleEndDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(startDate) && newDate < startDate) {
            newDate = startDate;
        }

        applyDates(event, startDate, newDate);
    });

    const handleDateFocus = useEventCallback(event => {
        if (!hasFocus && !isNil(onFocus)) {
            onFocus(event);
        }

        setHasFocus(true);
    });

    const handleDateBlur = useEventCallback(event => {
        if (hasFocus && !isNil(onBlur)) {
            onBlur(event);
        }

        setHasFocus(false);
    });

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, keys: string[]) => {
        const index = parseInt(keys[0]);
        const preset = presets[index];

        if (!isNil(preset)) {
            applyDates(event, preset.startDate, preset.endDate);
        }
    });

    const handleClearDates = useEventCallback((event: SyntheticEvent) => {
        applyDates(event, null, null);

        startDateRef?.current.focus();
    });

    const handleContainerKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            handleClearDates(event);
        }
    });

    const handleEndDateKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.backspace) {
            if (isNilOrEmpty(endDateRef.current?.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    const inputMarkup = (
        <Box
            onKeyDown={handleContainerKeyDown}
            className={cssModule(
                "o-ui-date-range-input",
                validationState,
                fluid && "fluid",
                disabled && "disabled",
                readOnly && "readonly",
                active && "active",
                focus && "focus",
                hover && "hover"
            )}
            role={!isInField ? "group" : undefined}
        >
            <CalendarIcon className="o-ui-date-range-input-icon" />
            <DateInput
                value={startDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                min={min}
                max={max}
                onDateChange={handleStartDateChange}
                autoFocus={autoFocus}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                disabled={disabled}
                readOnly={readOnly}
                name={!isNil(name) ? `${name}-start-date` : undefined}
                ref={startDateRef}
            />
            <Divider orientation="vertical" className="o-ui-date-range-input-divider" />
            <DateInput
                value={endDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                min={min}
                max={max}
                onChange={handleEndDateInputValueChange}
                onDateChange={handleEndDateChange}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                onKeyDown={handleEndDateKeyDown}
                disabled={disabled}
                readOnly={readOnly}
                name={!isNil(name) ? `${name}-end-date` : undefined}
                tabIndex={hasFocus ? 0 : -1}
                ref={endDateRef}
            />
            {hasValue && !disabled && !readOnly && <CrossButton
                onClick={handleClearDates}
                size="xs"
                condensed
                className="o-ui-date-range-input-clear-button"
                aria-label="Clear dates"
            />}
        </Box>
    );

    const presetsMarkup = !isNil(presets) && (
        <MenuTrigger>
            <IconButton
                shape="rounded"
                color="secondary"
                condensed
                aria-label="Date presets"
            >
                <VerticalDotsIcon />
            </IconButton>
            <Menu onSelectionChange={handleSelectPreset}>
                {presets.map((x, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index.toString()}>
                        {x.text}
                    </Item>
                ))}
            </Menu>
        </MenuTrigger>
    );

    const container = !isNil(presets) ? (
        <Box
            className="o-ui-date-range-input-group"
            role="presentation"
        >
            {inputMarkup}
            {presetsMarkup}
        </Box>
    ) : inputMarkup;

    // HACK: Returning the augmented element in a fragment to comply with react-docgen.
    return (
        <>
            {augmentElement(container, mergeProps(
                rest,
                {
                    as,
                    ref: containerRef
                }
            ))}
        </>
    );
}

export const DateRangeInput = forwardRef<InnerDateRangeInputProps>((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

export type DateRangeInputProps = ComponentProps<typeof DateRangeInput>;

DateRangeInput.displayName = "DateRangeInput";
