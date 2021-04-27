import { Modifier, Placement } from "@popperjs/core";
import { isNil, useEventCallback, useResizeObserver } from "../../shared";
import { usePopper } from "react-popper";

export type OverlayPosition = Placement;

export interface UseOverlayPositionOptions {
    arrowElement?: HTMLElement;
    position?: OverlayPosition;
    offset?: number[];
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
}

export function useOverlayPosition(triggerElement: Element, overlayElement: HTMLElement, {
    arrowElement,
    position = "bottom",
    offset,
    allowFlip = false,
    allowPreventOverflow = false,
    boundaryElement = document.body
}: UseOverlayPositionOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const popperModifiers: Partial<Modifier<string, object>>[] = [];

    if (!isNil(offset)) {
        popperModifiers.push({
            name: "offset",
            options: {
                offset
            }
        });
    }

    popperModifiers.push({
        name: "flip",
        enabled: allowFlip,
        options: {
            boundary: boundaryElement
        }
    });

    popperModifiers.push({
        name: "preventOverflow",
        enabled: allowPreventOverflow,
        options: {
            boundary: boundaryElement
        }
    });

    if (!isNil(arrowElement)) {
        popperModifiers.push({
            name: "arrow",
            options: {
                element: arrowElement
            }
        });
    }

    const { styles, attributes, update } = usePopper(triggerElement, overlayElement, {
        placement: position,
        modifiers: popperModifiers
    });

    const handleOverlayElementResize = useEventCallback(() => {
        if (!isNil(update)) {
            update();
        }
    });

    useResizeObserver(overlayElement, handleOverlayElementResize);

    return {
        overlayStyles: styles.popper,
        overlayProps: attributes.popper || {},
        arrowStyles: styles.arrow
    };
}
