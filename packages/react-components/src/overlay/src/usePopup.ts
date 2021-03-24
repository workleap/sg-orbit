import { AutoFocusChildOptions, mergeProps, useAutoFocusChild, useCommittedRef, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { FocusEvent, SyntheticEvent, useCallback, useState } from "react";
import { Placement } from "@popperjs/core";
import { isNil, isNumber } from "lodash";
import { isTargetParent } from "./isTargetParent";
import { useOverlayLightDismiss } from "./useOverlayLightDismiss";
import { useOverlayPosition } from "./useOverlayPosition";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { useRestoreFocus } from "./useRestoreFocus";

export interface UsePopupProps {
    id?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (event: SyntheticEvent, newValue: boolean) => void;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean | number;
    autoFocusOptions?: AutoFocusChildOptions;
    trigger?: "click" | "hover";
    hasArrow?: boolean;
    position?: Placement;
    offset?: number[];
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement,
    keyProp?: string;
}

export function usePopup(type: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog", {
    id,
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick,
    restoreFocus = true,
    autoFocus,
    autoFocusOptions = {},
    trigger = "click",
    hasArrow = false,
    position,
    offset,
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    keyProp
}: UsePopupProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState<HTMLElement>();
    const [overlayElement, setOverlayElement] = useState<HTMLElement>();
    const [arrowElement, setArrowElement] = useState<HTMLElement>();

    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const updateIsOpen = useCallback((event, newValue) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger({
        trigger,
        onToggle: useEventCallback(event => {
            updateIsOpen(event, !isOpen);
        }),
        onShow: useEventCallback(event => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback(event => {
            // Prevent from closing when the focus goes to an element of the overlay when opening.
            if (!isTargetParent((event as FocusEvent<HTMLElement>).relatedTarget, overlayElement)) {
                updateIsOpen(event, false);
            }
        })
    });

    // Usefull for component enabling hide on outside click like the Popover.
    const canHideOnInteractOutside = useCallback(event => {
        return !isTargetParent(event.target, triggerElement);
    }, [triggerElement]);

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        trigger,
        onHide: useEventCallback(event => {
            // Ignore events related to the trigger to prevent double toggle.
            if ((event as FocusEvent<HTMLElement>).relatedTarget !== triggerElement) {
                updateIsOpen(event, false);
            }
        }),
        hideOnEscape: isOpen && hideOnEscape,
        hideOnLeave: isOpen && hideOnLeave,
        hideOnOutsideClick: isOpen && hideOnOutsideClick ? canHideOnInteractOutside : false
    });

    const { overlayStyles, overlayProps: overlayPositionProps, arrowStyles } = useOverlayPosition(triggerElement, overlayElement, {
        arrowElement: hasArrow ? arrowElement : undefined,
        position,
        offset,
        allowFlip,
        allowPreventOverflow,
        boundaryElement
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });
    const focusManager = useFocusManager(focusScope, { keyProp });

    useAutoFocusChild(focusManager, {
        ...autoFocusOptions,
        isDisabled: !autoFocus || !isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: useEventCallback(() => {
            overlayElement?.focus();
        })
    });

    const overlayId = useId(id, id ? null : "o-ui-overlay");

    return {
        isOpen,
        setIsOpen: updateIsOpen,
        triggerElement,
        overlayElement,
        arrowElement,
        focusScope,
        focusManager,
        triggerProps: mergeProps(
            {
                tabIndex: !restoreFocus && isOpen ? -1 : undefined,
                "aria-haspopup": type,
                "aria-expanded": isOpen ? true : undefined,
                "aria-controls": isOpen ? overlayId : undefined,
                ref: setTriggerElement
            },
            triggerProps
        ),
        overlayProps: mergeProps(
            {
                id: overlayId,
                show: isOpen,
                style: overlayStyles,
                tabIndex: -1,
                ref: overlayRef
            },
            overlayDismissProps,
            overlayPositionProps,
            restoreFocusProps
        ),
        arrowProps: !hasArrow ? {} : {
            className: "o-ui-overlay-arrow",
            style: arrowStyles,
            ref: setArrowElement
        }
    };
}
