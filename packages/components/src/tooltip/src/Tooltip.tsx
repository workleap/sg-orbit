import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";

import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerTooltipProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerTooltip({
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerTooltipProps) {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    as,
                    className: "o-ui-tooltip",
                    ref: forwardedRef,
                    role: "tooltip"
                }
            )}
        >
            {children}
        </Text>
    );
}

InnerTooltip.defaultElement = DefaultElement;

/**
 * A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/tooltip--default-story)
*/

export const Tooltip = forwardRef<any, OmitInternalProps<InnerTooltipProps>>((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

export type TooltipProps = ComponentProps<typeof Tooltip>;
