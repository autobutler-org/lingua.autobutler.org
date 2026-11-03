import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import PlaygroundView from "../PlaygroundView.vue";
import type { CompilerViews } from "~/data/compiler";
import { playground } from "~/data/copy";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";
import { initialSampleId, samples } from "~/data/samples";

const captured: CompilerViews = {
  tokens,
  ast,
  tir,
  lir,
  assembly,
  run: runOutput,
};

function viewsFor(module: string, source: string): CompilerViews {
  if (module === "factorial" && source === sampleSource) {
    return captured;
  }
  const text = `compiled:${module}:${source}`;
  return { tokens: text, ast: text, tir: text, lir: text, assembly: text, run: text };
}

function mountPlayground() {
  return mount(PlaygroundView, {
    props: {
      compile: viewsFor,
      initialSampleId,
      samples,
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

  it("recompiles when the source changes, and restores tokens for the sample", async () => {
    const wrapper = mountPlayground();
    const area = wrapper.get("textarea");
    await area.setValue(`${sampleSource}\n`);
    expect(wrapper.get("pre").element.textContent).toBe(`compiled:factorial:${sampleSource}\n`);
    await area.setValue(sampleSource);
    expect(wrapper.get("pre").element.textContent).toBe(tokens);
  });

  it("shows the compiled text on every panel after an edit", async () => {
    const wrapper = mountPlayground();
    await wrapper.get("textarea").setValue("not the sample");
    await tab(wrapper, "Run").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe("compiled:factorial:not the sample");
    expect(wrapper.get(".run-note").text()).toBe(playground.runNote);
    await tab(wrapper, "AST").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe("compiled:factorial:not the sample");
    expect(wrapper.find(".run-note").exists()).toBe(false);
  });

  it("shows the captured run output and the interpreter note for the sample", async () => {
    const wrapper = mountPlayground();
    await tab(wrapper, "Run").trigger("click");
    expect(wrapper.get("pre").element.textContent).toBe(runOutput);
    expect(wrapper.get(".run-note").text()).toBe(playground.runNote);
  });

  it("loads another sample into the buffer and compiles it under that module", async () => {
    const wrapper = mountPlayground();
    const select = wrapper.get("select");
    expect((select.element as HTMLSelectElement).value).toBe("factorial");
    await select.setValue("hello");
    const hello = samples.find((sample) => sample.id === "hello");
    if (!hello) {
      throw new Error("missing hello");
    }
    expect((wrapper.get("textarea").element as HTMLTextAreaElement).value).toBe(hello.source);
    expect(wrapper.get("pre").element.textContent).toBe(`compiled:hello:${hello.source}`);
    await select.setValue("factorial");
    expect((wrapper.get("textarea").element as HTMLTextAreaElement).value).toBe(sampleSource);
    expect(wrapper.get("pre").element.textContent).toBe(tokens);
  });
});
