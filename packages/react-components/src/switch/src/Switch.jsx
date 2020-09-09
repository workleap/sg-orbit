import "./Switch.css";

import { ClearSlots, SlotProvider } from "../../shared";
import { Text, textSlot } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { counterSlot } from "../../counter";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";
import { isFunction } from "lodash";
import { useCheckbox } from "../../checkbox";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked: bool,
    /**
     * Whether the checkbox should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse: bool,
    /**
     * Called when the switch checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func])
};

export function InnerSwitch(props) {
    const {
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
        onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as: ElementType = "label",
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    const {
        isChecked,
        wrapperProps,
        inputProps
    } = useCheckbox({
        cssModule: "o-ui-switch",
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
        onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        className,
        forwardedRef
    });

    let content = isFunction(children)
        ? children({ isChecked }, props)
        : children;

    if (typeof content === "string") {
        content = <Text>{content}</Text>;
    }

    return (
        <ElementType
            data-testid="switch"
            {...rest}
            {...wrapperProps}
        >
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-switch-switch" />
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: textSlot({
                            size,
                            className: "o-ui-switch-label"
                        }),
                        icon: iconSlot({
                            size,
                            className: "o-ui-switch-icon"
                        }),
                        counter: counterSlot({
                            size,
                            reverse,
                            className: "o-ui-switch-counter"
                        })
                    }}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerSwitch.propTypes = propTypes;

export const Switch = forwardRef((props, ref) => (
    <InnerSwitch {...props} forwardedRef={ref} />
));

export const Toggle = Switch;
