import styles from "./props-tabs.module.css";

import { Checkbox, Tab } from "semantic-ui-react";
import { Props } from "@storybook/addon-docs/blocks";
import { any, arrayOf, shape, string } from "prop-types";
import { isNil } from "lodash";
import { useState } from "react";
import cx from "classnames";

const propTypes = {
    componentsDefinitions: arrayOf(shape({
        displayName: string.isRequired,
        component: any.isRequired
    })).isRequired
};

export function PropsTabs({ componentsDefinitions }) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    if (componentsDefinitions.length === 0) {
        throw new Error(`${PropsTabs.name} - At least one component definition must be provided.`);
    }

    const handleTabChange = (event, data) => {
        setActiveIndex(data.activeIndex);
        setIsVisible(true);
    };

    const handleToggleChange = () => {
        setActiveIndex(isNil(activeIndex) ? 0 : activeIndex);
        setIsVisible(!isVisible);
    };

    const createPanes = () => {
        return componentsDefinitions.map(x => {
            return {
                menuItem: x.displayName,
                render: () => {
                    return (
                        <If condition={isVisible}>
                            <Tab.Pane attached={false}>
                                <Props of={x.component} />
                            </Tab.Pane>
                        </If>
                    );
                }
            };
        });
    };

    const hasMultipleComponents = componentsDefinitions.length > 1;

    return (
        <div className={`relative flex flex-column props-table ${cx({ [styles.noTabs]: !hasMultipleComponents })}`}>
            <div className={isVisible ? "mb7" : "mb3"}>
                <Checkbox
                    label={`View component${hasMultipleComponents ? "s" : ""} props`}
                    checked={isVisible}
                    toggle
                    onChange={handleToggleChange}
                />
            </div>
            <Choose>
                <When condition={hasMultipleComponents && isVisible}>
                    <Tab
                        activeIndex={activeIndex}
                        panes={createPanes()}
                        menu={{ secondary: true, pointing: true, compact: true, fluid: true }}
                        onTabChange={handleTabChange}
                        className="flex-auto mb6"
                    />
                </When>
                <Otherwise>
                    <If condition={isVisible}>
                        <Props of={componentsDefinitions[0].component} className={styles.noTabs} />
                    </If>
                </Otherwise>
            </Choose>
        </div>
    );
}

PropsTabs.propTypes = propTypes;
