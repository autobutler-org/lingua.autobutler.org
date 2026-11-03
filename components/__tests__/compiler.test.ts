import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { loadCompiler } from "~/data/compiler";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";
import { samples } from "~/data/samples";

const wasmPath = join(process.cwd(), "public/lingua.wasm");

describe("playground wasm", () => {
  it("matches the factorial captures and recompiles an edit", async () => {
    const compile = await loadCompiler(readFileSync(wasmPath));
    const factorial = samples.find((sample) => sample.id === "factorial");
    expect(factorial?.source).toBe(sampleSource);
    const views = compile("factorial", sampleSource);
    expect(views.tokens).toBe(tokens);
    expect(views.ast).toBe(ast);
    expect(views.tir).toBe(tir);
    expect(views.lir).toBe(lir);
    expect(views.assembly).toBe(assembly);
    expect(views.run).toBe(runOutput);

    const edited = compile("factorial", sampleSource.replace("20! =", "edited ="));
    expect(edited.run).toContain("edited = 2432902008176640000\n");
    expect(edited.tokens).not.toBe(tokens);
    expect(edited.tir).not.toBe(tir);
  });

  it("compiles every sample under its own module name", async () => {
    const compile = await loadCompiler(readFileSync(wasmPath));
    for (const sample of samples) {
      const views = compile(sample.module, sample.source);
      expect(views.ast.startsWith(`(module "${sample.module}"`)).toBe(true);
      expect(views.tokens.length).toBeGreaterThan(0);
      expect(views.run.length).toBeGreaterThan(0);
    }
    const hello = compile("hello", samples[0]?.source ?? "");
    expect(hello.run).toBe("hello, world\n");
    expect(hello.assembly.startsWith("TEXT hello.main(SB)\n")).toBe(true);
  });
});
