import "./Disclosure.css";

import { Children, forwardRef, useCallback } from "react";
import { DisclosureProvider } from "./DisclosureContext";
import { KEYS, augmentElement, resolveChildren, useControllableState, useEventCallback, useId } from "../../shared";
import { Transition } from "../../transition";
import { any, bool, func } from "prop-types";
import { isNil } from "lodash";

/*
- Controlled
*/

const propTypes = {
    /**
     * A controlled open value.
     */
    open: bool,
    /**
     * The initial value of `open` when uncontrolled.
     */
    defaultOpen: bool,
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isOpen - Whether or not the content is visible.
     * @returns {void}
     */
    onChange: func,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerDisclosure({
    id,
    open,
    defaultOpen,
    onChange,
    children
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const [trigger, content] = Children.toArray(resolveChildren(children, {
        isOpen
    }));

    if (isNil(trigger) || isNil(content)) {
        throw new Error("A disclosure component must have a trigger and a content elements.");
    }

    const toggle = useCallback(event => {
        setIsOpen(x => !x);

        if (!isNil(onChange)) {
            onChange(event, !isOpen);
        }
    }, [isOpen, setIsOpen, onChange]);

    const handleClick = useEventCallback(event => {
        toggle(event);
    });

    const handleKeyDown = useEventCallback(event => {
        event.preventDefault();

        switch(event.keyCode) {
            case KEYS.enter:
            case KEYS.space:
                toggle(event);
                break;
        }
    });

    const rootId = useId(id, id ? undefined: "o-ui-disclosure");
    const contentId = `${rootId}-content`;

    const triggerMarkup = augmentElement(trigger, {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        role: "button",
        "aria-expanded": isOpen,
        "aria-controls": contentId
    });

    const contentMarkup = augmentElement(content, {
        id: contentId,
        hidden: !isOpen,
        className: "o-ui-disclosure-content"
    });

    return (
        <DisclosureProvider
            value={{
                isOpen
            }}
        >
            {triggerMarkup}
            <Transition
                show={isOpen}
                enter="o-ui-slide-down"
                leave="o-ui-slide-up"
            >
                {contentMarkup}
            </Transition>
        </DisclosureProvider>
    );
}

InnerDisclosure.propTypes = propTypes;

export const Disclosure = forwardRef((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));
