import { createFocusableTreeWalker } from "@components/shared";

test("accept input elements", () => {
    const element = document.createElement("INPUT");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject disabled input elements", () => {
    const element = document.createElement("INPUT");
    element.setAttribute("disabled", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept select elements", () => {
    const element = document.createElement("SELECT");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject disabled select elements", () => {
    const element = document.createElement("SELECT");
    element.setAttribute("disabled", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept textarea elements", () => {
    const element = document.createElement("TEXTAREA");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject disabled textarea elements", () => {
    const element = document.createElement("TEXTAREA");
    element.setAttribute("disabled", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept button elements", () => {
    const element = document.createElement("BUTTON");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject disabled button elements", () => {
    const element = document.createElement("BUTTON");
    element.setAttribute("disabled", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept anchor elements", () => {
    const element = document.createElement("A");
    element.setAttribute("href", "https://www.google.com");
    element.innerHTML = "Google";

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("accept summary elements", () => {
    const element = document.createElement("SUMMARY");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("accept tabbable elements", () => {
    const element = document.createElement("DIV");
    element.setAttribute("tabindex", "1");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject non focusable elements", () => {
    const element = document.createElement("DIV");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject non tabbable elements", () => {
    const element = document.createElement("INPUT");
    element.setAttribute("tabindex", "-1");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject non visible elements", () => {
    const element = document.createElement("INPUT");
    element.style.display = "none";

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject comment node", () => {
    const commentNode = document.createComment("comment");

    const container = document.createElement("DIV");
    container.appendChild(commentNode);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject elements with \"display: none\"", () => {
    const element = document.createElement("INPUT");
    element.style.display = "none";

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject elements with \"visibility: hidden\"", () => {
    const element = document.createElement("INPUT");
    element.style.visibility = "hidden";

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject elements with \"visibility: collapse\"", () => {
    const element = document.createElement("INPUT");
    element.style.visibility = "collapse";

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject elements with hidden attribute", () => {
    const element = document.createElement("INPUT");
    element.setAttribute("hidden", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("reject elements with an aria-hidden attribute set to \"true\"", () => {
    const element = document.createElement("INPUT");
    element.setAttribute("aria-hidden", "true");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept elements with an aria-hidden attribute set to \"false\"", () => {
    const element = document.createElement("INPUT");
    element.setAttribute("aria-hidden", "false");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});

test("reject elements with a not visible parent", () => {
    const element = document.createElement("INPUT");

    const container = document.createElement("DIV");
    container.style.display = "none";
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBeNull();
});

test("accept elements with a visible parent", () => {
    const element = document.createElement("INPUT");

    const container = document.createElement("DIV");
    container.appendChild(element);

    const walker = createFocusableTreeWalker(container);

    expect(walker.firstChild()).toBe(element);
});
