import { animated, useSpring } from "react-spring";
import { any, bool } from "prop-types";

// Since the date pickers are currently not based on hooks, the animation must be in an external component.
export const FadeIn = ({ active, children, className }) => {
    const AnimatedComponent = animated["div"];

    const transition = useSpring({
        opacity: active ? 1 : 0,
        display: active ? "block" : "none"
    });

    return (
        <AnimatedComponent style={transition} className={className}>
            {children}
        </AnimatedComponent>
    );
};

FadeIn.propTypes = {
    active: bool.isRequired,
    children: any.isRequired
};
