import "./Link.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { NewTabIndicator } from "./NewTabIndicator";
import { OmitInternalProps, as, augmentElement, mergeProps, useSlots, useStyleProps } from "../../shared";
import { SharedLinkProps } from "./Link";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";
import { useFormButton } from "../../form";
import { useLink } from "./useLink";

// TODO: put back "color" once it's the actual color have been moved to a variant.
export interface InnerTextLinkProps extends Omit<SharedLinkProps, "color"> {
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * A link can vary in size.
     */
    size?: "sm" | "md" | "inherit";
    /**
     * The underline style.
     */
    underline?: "solid" | "dotted" | "none";
}

export function InnerTextLink(props: InnerTextLinkProps) {
    const [styleProps] = useStyleProps("link");
    const [formProps] = useFormButton();

    const {
        active,
        autoFocus,
        children,
        color,
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        size,
        target,
        underline = "solid",
        visited,
        ...rest
    } = mergeProps(
        props,
        styleProps,
        formProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        active,
        autoFocus,
        color,
        cssModule: "o-ui-text-link",
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        target,
        underline,
        visited
    });

    const { icon, "start-icon": startIcon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: null,
        "start-icon": {
            className: "o-ui-link-start-icon",
            size: embeddedIconSize(size)
        },
        text: {
            className: "o-ui-link-text",
            size
        }
    }), [size]));

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-link-end-icon",
        size: embeddedIconSize(size)
    });

    return (
        <Box
            {...mergeProps(
                rest,
                linkProps
            )}
        >
            {startIcon}
            {text}
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

export const TextLink = forwardRef<any, OmitInternalProps<InnerTextLinkProps>>((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));

export type TextLinkProps = ComponentProps<typeof TextLink>;

/////////

export const TextLinkAsButton = as(TextLink, "button");
