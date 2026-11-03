import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { loadCompiler } from "~/data/compiler";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";

const wasmPath = join(process.cwd(), "public/lingua.wasm");

describe("playground wasm", () => {
  it("matches the factorial captures and recompiles an edit", async () => {
    const compile = await loadCompiler(readFileSync(wasmPath));
    const views = compile(sampleSource);
    expect(views.tokens).toBe(tokens);
    expect(views.ast).toBe(ast);
    expect(views.tir).toBe(tir);
    expect(views.lir).toBe(lir);
    expect(views.assembly).toBe(assembly);
    expect(views.run).toBe(runOutput);

    const edited = compile(sampleSource.replace("20! =", "edited ="));
    expect(edited.run).toContain("edited = 2432902008176640000\n");
    expect(edited.tokens).not.toBe(tokens);
    expect(edited.tir).not.toBe(tir);
  });
});
