import { SyntheticEvent, createContext, useContext } from "react";
import { isNil } from "lodash";

interface CheckableContextType {
    checkedValue?: boolean | string | number;
    onCheck?(event: SyntheticEvent, newValue: boolean | string | number): void;
}

export const CheckableContext = createContext<CheckableContextType>(undefined);

export function useCheckableContext(): [CheckableContextType, boolean] {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [context, false];
}

type CheckableProps = Omit<CheckableContextType, "checkedValue"> & {
    checked?: boolean;
}

export function useCheckableProps({ value }: { value?: boolean | string | number }): [CheckableProps, boolean] {
    const [context, isCheckable] = useCheckableContext();

    if (isCheckable) {
        const { checkedValue, ...rest } = context;

        const props = {
            checked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}
