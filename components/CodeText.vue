<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ readonly text: string }>();

const parts = computed(() =>
  props.text
    .split("`")
    .map((text, index) => ({ code: index % 2 === 1, text }))
    .filter((part) => part.text.length > 0)
);
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <code v-if="part.code">{{ part.text }}</code>
    <span v-else>{{ part.text }}</span>
  </template>
</template>

<style scoped>
code {
  font-family: var(--font-mono);
  font-size: 0.92em;
}
</style>
