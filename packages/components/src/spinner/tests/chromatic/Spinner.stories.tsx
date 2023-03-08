import { Spinner, SpinnerProps } from "@components/spinner";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Spinner,
    title: "Chromatic/Spinner"
} as ComponentMeta<typeof Spinner>;

type SpinnerStory = ComponentStoryObj<typeof Spinner>;

// We deactivate the animation to avoid flaky tests.
const InactiveSpinner = ({ ...props }: SpinnerProps) => (
    <Spinner active={false} {...props} />
);

export const Default: SpinnerStory = {
    storyName: "default",
    render: () => (
        <Inline alignY="end">
            <InactiveSpinner size="sm" aria-label="Crawling in progress" />
            <InactiveSpinner size="md" aria-label="Crawling in progress" />
            <InactiveSpinner size="lg" aria-label="Crawling in progress" />
        </Inline>
    )
};

export const Variant: SpinnerStory = {
    storyName: "variant",
    render: () => (
        <Inline alignY="end" backgroundColor="alias-accent">
            <InactiveSpinner variant="overBackground" aria-label="Crawling in progress" />
            <InactiveSpinner variant="overBackground">Crawling in progress</InactiveSpinner>
        </Inline>
    )
};

export const Styling: SpinnerStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <InactiveSpinner color="red">Crawling in progress</InactiveSpinner>
            <InactiveSpinner className="border-red" />
            <InactiveSpinner style={{ border: "1px solid red" }} />
        </Inline>
    )
};

export const Zoom: SpinnerStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Inline alignY="end" className="zoom-in">
                <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
                <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
                <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
            </Inline>
            <Inline alignY="end" className="zoom-out">
                <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
                <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
                <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
            </Inline>
        </Stack>
    )
};

export const Label: SpinnerStory = {
    storyName: "label",
    render: () => (
        <Inline alignY="end" >
            <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
        </Inline>
    )
};

export const Overflow: SpinnerStory = {
    storyName: "overflow",
    render: () => (
        <Stack width={10}>
            <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
        </Stack>
    )
};
