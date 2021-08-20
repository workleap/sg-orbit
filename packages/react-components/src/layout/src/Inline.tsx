import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Flex, FlexProps } from "./Flex";
import { isNil, mergeProps } from "../../shared";
import { useFlexAlignment } from "./adapters";

export interface InnerInlineProps extends Omit<FlexProps, "wrap"> {
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Space to display between each elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid?: boolean;
    /**
    * @ignore
    */
    as?: ElementType;
    /**
     * React children
    */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerInline({
    align,
    verticalAlign,
    children,
    gap = 5,
    wrap,
    forwardedRef,
    ...rest
}: InnerInlineProps) {
    const alignProps = useFlexAlignment("horizontal", align, verticalAlign);

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    gap: gap !== 0 ? gap : undefined,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    ref: forwardedRef
                } as const,
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Inline = forwardRef<any, Omit<InnerInlineProps, "forwardedRef">>((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));

export type InlineProps = ComponentProps<typeof Inline>;

Inline.displayName = "Inline";
