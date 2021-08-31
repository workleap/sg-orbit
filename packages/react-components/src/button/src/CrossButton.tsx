import { ComponentProps, MouseEventHandler, forwardRef } from "react";
import { CrossIcon } from "../../icons";
import { IconButton, IconButtonProps } from "./IconButton";
import { InternalProps, OmitInternalProps, SlotProps, slot } from "../../shared";

export interface InnerCrossButtonProps extends SlotProps, InternalProps, Omit<IconButtonProps, "children"> {
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the cross button is disabled.
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    onClick?: MouseEventHandler;
    /**
     * A cross button can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md";
}

export function InnerCrossButton({ forwardedRef, ...rest }: InnerCrossButtonProps) {
    return (
        <IconButton
            {...rest}
            ref={forwardedRef}
            shape="circular"
            variant="ghost"
        >
            <CrossIcon />
        </IconButton>
    );
}

export const CrossButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerCrossButtonProps>>((props, ref) => (
    // @ts-ignore
    <InnerCrossButton {...props} forwardedRef={ref} />
)));

export type CrossButtonProps = ComponentProps<typeof CrossButton>;
