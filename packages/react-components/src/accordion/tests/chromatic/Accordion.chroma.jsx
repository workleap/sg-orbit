import { Accordion, AccordionHeader, useAccordionItemContext } from "@react-components/accordion";
import { Box } from "@react-components/box";
import { CheckCircleIcon, CrossIcon, InfoIcon } from "@react-components/icons";
import { Content, Header } from "@react-components/view";
import { Item } from "@react-components/collection";
import { Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Accordion"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Accordion>
            <Item>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("icon", () =>
        <Accordion>
            <Item>
                <Header>
                    <InfoIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header>
                    <InfoIcon />
                    <Text>Jupiter</Text>
                </Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>
                    <InfoIcon />
                    <Text>Venus</Text>
                </Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("default index", () =>
        <Accordion defaultIndex={1}>
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("multiple", () =>
        <Accordion multiple defaultIndex={[0, 2]}>
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("narrow container", () =>
        <div style={{ width: "75px" }}>
            <Accordion>
                <Item>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        </div>
    )
    .add("states", () =>
        <Accordion>
            <Item active>
                <Header>Uranus</Header>
                <Content>Uranus is the seventh planet from the Sun.</Content>
            </Item>
            <Item focus>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item hover>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item focus hover>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
            <Item disabled>
                <Header>Saturn</Header>
                <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
            </Item>
        </Accordion>
    )
    .add("as div", () =>
        <Accordion>
            <Item>
                <Header as="div" role="button">Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header as="div" role="button">Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header as="div" role="button">Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("render props", () =>
        <Accordion defaultIndex={0}>
            <Item>
                {({ isOpen }) => (
                    <>
                        <Header>
                            {isOpen ? <CheckCircleIcon /> : <CrossIcon />}
                            <Text>Mars</Text>
                        </Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </>
                )}
            </Item>
            <Item>
                {({ isOpen }) => (
                    <>
                        <Header>
                            {isOpen ? <CheckCircleIcon /> : <CrossIcon />}
                            <Text>Jupiter</Text>
                        </Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </>
                )}
            </Item>
        </Accordion>
    )
    .add("data render", () =>
        <Stack gap={13}>
            <Accordion>
                {[1, 2, 3].map(x => (
                    <Item key={x}>
                        <Header>{`Header ${x}`}</Header>
                        <Content>{`Content ${x}`}</Content>
                    </Item>
                ))}
            </Accordion>
            <Accordion defaultIndex={1}>
                {[1, 2, 3].map(x => (
                    <Item key={x}>
                        {({ isOpen }) => (
                            <>
                                <Header>
                                    {isOpen ? <CheckCircleIcon /> : <CrossIcon />}
                                    <Text>{`Header ${x}`}</Text>
                                </Header>
                                <Content>{`Content ${x}`}</Content>
                            </>
                        )}
                    </Item>
                ))}
            </Accordion>
        </Stack>
    )
    .add("custom component", () => {
        const ActiveHeader = ({ children, ...rest }) => {
            const { isOpen } = useAccordionItemContext();

            return (
                <AccordionHeader
                    {...rest}
                    style={{ backgroundColor: isOpen ? "blue" : "red" }}
                >
                    {children}
                </AccordionHeader>
            );
        };

        return (
            <Accordion defaultIndex={1}>
                <Item>
                    <ActiveHeader>Mars</ActiveHeader>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item>
                    <ActiveHeader>Jupiter</ActiveHeader>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        );
    })
    .add("custom as", () => {
        const ActiveHeader = ({ children, ...rest }) => {
            const { isOpen } = useAccordionItemContext();

            return (
                <Box
                    {...rest}
                    style={{ backgroundColor: isOpen ? "blue" : "red" }}
                >
                    {children}
                </Box>
            );
        };

        return (
            <Accordion defaultIndex={1}>
                <Item>
                    <Header as={ActiveHeader}>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as={ActiveHeader}>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        );
    })
    .add("autofocus", () =>
        <Accordion autoFocus>
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    )
    .add("autofocus delay", () =>
        <Accordion autoFocus autoFocusDelay={50}>
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
