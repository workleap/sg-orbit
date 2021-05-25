import "./InputGroup.css";

import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, useMemo } from "react";
import { ClearFieldContext, useFieldInputProps } from "../../field";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { IconAddon } from "./IconAddon";
import { InputGroupContext } from "./InputGroupContext";
import { TextAddon } from "./TextAddon";
import { TooltipTrigger, parseTooltipTrigger } from "../../tooltip";
import { cssModule, forwardRef, getSlotKey, isNil, mergeProps, omitProps, resolveChildren } from "../../shared";

export interface InnerInputGroupProps {
    /**
     * Whether or not the input group take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the input group is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the input group is readonly.
     */
    readOnly?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

function toAddon(element: ReactElement, key?: number): ReactNode {
    if (getSlotKey(element) === "text") {
        return (
            <TextAddon key={key}>
                {element}
            </TextAddon>
        );
    }

    if (getSlotKey(element) === "icon") {
        return (
            <IconAddon key={key}>
                {element}
            </IconAddon>
        );
    }

    if (element.type === TooltipTrigger) {
        const { children, ...props } = element.props;

        const [trigger, tooltip] = parseTooltipTrigger(children);

        const addon = toAddon(trigger);

        return (
            <TooltipTrigger {...props} key={key}>
                {addon}
                {tooltip}
            </TooltipTrigger>
        );
    }

    return element;
}

export function InnerInputGroup(props: InnerInputGroupProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        fluid,
        disabled,
        readOnly,
        as = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const transformedChildren = useMemo(() => {
        const elements = Children.toArray(resolveChildren(children)).filter(x => !isNil(x));

        if (elements.length <= 1) {
            throw new Error("An input group component must have 2 or 3 children.");
        }

        return Children
            .toArray(children)
            .reduce((acc: ReactNode[], x: ReactElement, index) => {
                acc.push(toAddon(x, index));

                return acc;
            }, []) as ReactNode[];
    }, [children]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-input-group",
                        fluid && "fluid"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <ClearToolbar>
                <ClearFieldContext>
                    <InputGroupContext.Provider
                        value={{
                            fluid,
                            disabled,
                            readOnly
                        }}
                    >
                        {transformedChildren}
                    </InputGroupContext.Provider>
                </ClearFieldContext>
            </ClearToolbar>
        </Box>
    );
}

export const InputGroup = forwardRef<InnerInputGroupProps>((props, ref) => (
    <InnerInputGroup {...props} forwardedRef={ref} />
));

export type InputGroupProps = ComponentProps<typeof InputGroup>;

InputGroup.displayName = "InputGroup";
