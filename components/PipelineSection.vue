<script setup lang="ts">
import SectionIntro from "./SectionIntro.vue";
import { pipeline } from "~/data/copy";
</script>

<template>
  <section class="pipeline">
    <SectionIntro :eyebrow="pipeline.eyebrow" :heading="pipeline.heading" :lede="pipeline.lede" />
    <ol class="stages">
      <li v-for="(stage, index) in pipeline.stages" :key="stage.name" class="reveal">
        <span class="number" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
        <h3>{{ stage.name }}</h3>
        <p>{{ stage.body }}</p>
      </li>
    </ol>
    <p class="more">
      <a :href="pipeline.link.href">{{ pipeline.link.label }}</a>
    </p>
  </section>
</template>

<style scoped>
.pipeline {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--section-gap) var(--gutter);
  box-sizing: border-box;
}

.stages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 2.5rem var(--gutter);
  margin: 3.5rem 0 0;
  padding: 0;
  list-style: none;
}

li {
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-text-strong);
}

.number {
  display: block;
  margin-bottom: 2.5rem;
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
  font-variant-numeric: lining-nums;
  color: var(--color-text-muted);
}

h3 {
  margin: 0 0 0.6rem;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--color-text-strong);
}

p {
  margin: 0;
  max-width: 36ch;
  color: var(--color-text-muted);
  text-wrap: pretty;
}

.more {
  max-width: none;
  margin-top: 2.5rem;
}

.more a {
  color: var(--color-text-strong);
  font-weight: 500;
  text-underline-offset: 0.18em;
}
</style>
