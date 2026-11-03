<script setup lang="ts">
import { onMounted, shallowRef } from "vue";

import PlaygroundView from "~/components/PlaygroundView.vue";
import { loadCompiler, type CompilerViews } from "~/data/compiler";
import { playground } from "~/data/copy";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";

useSeoMeta({
  title: playground.title,
  description: playground.description,
});

const captured: CompilerViews = {
  tokens,
  ast,
  tir,
  lir,
  assembly,
  run: runOutput,
};

function pending(): CompilerViews {
  const text = playground.loading;
  return { tokens: text, ast: text, tir: text, lir: text, assembly: text, run: text };
}

const compile = shallowRef<(source: string) => CompilerViews>((source) =>
  source === sampleSource ? captured : pending()
);

onMounted(async () => {
  try {
    const response = await fetch("/lingua.wasm");
    if (!response.ok) {
      throw new Error(`could not load the compiler (${response.status})`);
    }
    compile.value = await loadCompiler(await response.arrayBuffer());
  } catch (error: unknown) {
    const text = error instanceof Error ? error.message : "could not load the compiler";
    compile.value = () => ({
      tokens: text,
      ast: text,
      tir: text,
      lir: text,
      assembly: text,
      run: text,
    });
  }
});
</script>

<template>
  <PlaygroundView :compile="compile" :sample-source="sampleSource" />
</template>
