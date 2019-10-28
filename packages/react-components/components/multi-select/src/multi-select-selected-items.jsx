import { Button, Label } from "semantic-ui-react";
import { CancelIcon } from "@orbit-ui/icons";
import { ITEM_SHAPE } from "./items";
import { PureComponent } from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";
import { mergeClasses } from "@orbit-ui/react-components-shared";
import cx from "classnames";

function defaultItemRenderer(item, { disabled, onRemove }) {
    return (
        <Label
            basic
            className={cx("large", { icon: !disabled })}
            disabled={disabled}
            data-testid={`multi-select-selected-item-${item.value}`}
        >
            {item.text}
            <If condition={!disabled}>
                <Button
                    circular
                    size="mini"
                    icon
                    className="transparent"
                    onClick={onRemove}
                    type="button"
                >
                    <CancelIcon className="h3 w3" />
                </Button>
            </If>
        </Label>
    );
}

class MultiSelectSelectedItem extends PureComponent {
    static propTypes = {
        item: shape(ITEM_SHAPE).isRequired,
        itemRenderer: func,
        onRemove: func.isRequired,
        disabled: bool,
        className: string
    };

    handleRemove = event => {
        const { item, onRemove } = this.props;

        onRemove(event, item, this.props);
    };

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "mr2 mb2",
            className
        );
    }

    render() {
        const { item, itemRenderer, disabled } = this.props;

        return <div className={this.getClasses()}>{itemRenderer(item, { disabled: disabled, onRemove: this.handleRemove })}</div>;
    }
}

export class MultiSelectSelectedItems extends PureComponent {
    static propTypes = {
        /**
         * Items to display.
         */
        items: arrayOf(shape(ITEM_SHAPE)),
        /**
         * Render an item.
         */
        itemRenderer: func,
        /**
         * Called when an item is removed.
         */
        onRemoveSelectedItem: func,
        /**
         * A disabled selected items does not allow user interaction.
         */
        disabled: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps ={
        itemRenderer: defaultItemRenderer
    }

    handleRemoveSelectedItem = (event, item) => {
        const { onRemoveSelectedItem } = this.props;

        onRemoveSelectedItem(event, item);
    };

    renderItems() {
        const { items, itemRenderer, disabled, className } = this.props;

        return items.map(x => {
            return <MultiSelectSelectedItem
                item={x}
                itemRenderer={itemRenderer}
                onRemove={this.handleRemoveSelectedItem}
                key={x.value}
                disabled={disabled}
                className={className}
            />;
        });
    }

    render() {
        const { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return <>{this.renderItems()}</>;
    }
}
