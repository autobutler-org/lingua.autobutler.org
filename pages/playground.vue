<script setup lang="ts">
import PlaygroundView from "~/components/PlaygroundView.vue";
import { playground } from "~/data/copy";
import { assembly, ast, lir, runOutput, sampleSource, tir, tokens } from "~/data/sample";

useSeoMeta({
  title: playground.title,
  description: playground.description,
});
</script>

<template>
  <PlaygroundView
    :assembly="assembly"
    :ast="ast"
    :lir="lir"
    :run-output="runOutput"
    :sample-source="sampleSource"
    :tir="tir"
    :tokens="tokens"
  />
</template>
