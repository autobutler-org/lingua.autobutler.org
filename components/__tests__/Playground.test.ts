import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import PlaygroundView from "../PlaygroundView.vue";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";

const notEmbedded =
  "The in-browser compiler is not embedded yet. This page shows the captured pipeline for the sample program.";

function mountPlayground() {
  return mount(PlaygroundView, {
    props: {
      assembly,
      ast,
      lir,
      runOutput,
      sampleSource,
      tir,
      tokens,
    },
  });
}

function tab(wrapper: ReturnType<typeof mountPlayground>, label: string) {
  const match = wrapper
    .findAll('button[role="tab"]')
    .find((candidate) => candidate.text() === label);
  if (!match) {
    throw new Error(`missing tab ${label}`);
  }
  return match;
}

describe("Playground", () => {
  it("fills the textarea with the factorial sample", () => {
    const wrapper = mountPlayground();
    const area = wrapper.get("textarea").element as HTMLTextAreaElement;
    expect(area.value).toBe(sampleSource);
    expect(area.getAttribute("aria-label")).toBe("Lingua source");
    expect(area.getAttribute("spellcheck")).toBe("false");
  });

  it("shows the captured tokens", () => {
    const wrapper = mountPlayground();
    expect(tokens.startsWith("1:1 Keyword(Fn)\n")).toBe(true);
    expect(wrapper.get("pre").element.textContent).toBe(tokens);
    expect(wrapper.get('button[aria-selected="true"]').text()).toBe("Tokens");
  });

  it("shows the captured assembly when that tab is chosen", async () => {
    const wrapper = mountPlayground();
    const assemblyTab = tab(wrapper, "Assembly");
    await assemblyTab.trigger("click");
    expect(assemblyTab.attributes("aria-selected")).toBe("true");
    expect(assembly.startsWith("TEXT factorial.factorial(SB)\n")).toBe(true);
    expect(wrapper.get("pre").element.textContent).toBe(assembly);
  });

  it("shows the captured TIR when that tab is chosen", async () => {
    const wrapper = mountPlayground();
    await tab(wrapper, "TIR").trigger("click");
    expect(tir.startsWith("(program\n")).toBe(true);
    expect(wrapper.get("pre").element.textContent).toBe(tir);
  });

  it("replaces the panel when the source changes, and restores tokens for the sample", async () => {
    const wrapper = mountPlayground();
    const area = wrapper.get("textarea");
    await area.setValue(`${sampleSource}\n`);
    expect(wrapper.get("pre").element.textContent).toBe(notEmbedded);
    expect(wrapper.find(".run-note").exists()).toBe(false);
    await area.setValue(sampleSource);
    expect(wrapper.get("pre").element.textContent).toBe(tokens);
  });

  it("shows only the not-embedded sentence on every panel after an edit", async () => {
    const wrapper = mountPlayground();
    await wrapper.get("textarea").setValue("not the sample");
    await tab(wrapper, "Run").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe(notEmbedded);
    expect(wrapper.find(".run-note").exists()).toBe(false);
    await tab(wrapper, "AST").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe(notEmbedded);
  });

  it("shows the captured run output and the interpreter note for the sample", async () => {
    const wrapper = mountPlayground();
    await tab(wrapper, "Run").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe(runOutput);
    expect(wrapper.get(".run-note").text()).toBe(
      "The compiler's interpreter already produces this, in step with the native binary. This page will run edited source once that interpreter is built for the browser."
    );
  });
});
