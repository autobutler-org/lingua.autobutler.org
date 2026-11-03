<script setup lang="ts">
import CodeText from "./CodeText.vue";
import SectionIntro from "./SectionIntro.vue";
import { features } from "~/data/copy";
</script>

<template>
  <section class="features">
    <SectionIntro :eyebrow="features.eyebrow" :heading="features.heading" />
    <ul class="grid">
      <li v-for="(feature, index) in features.items" :key="feature.name" class="card reveal">
        <span class="index" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
        <h3><CodeText :text="feature.name" /></h3>
        <p><CodeText :text="feature.body" /></p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.features {
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--section-gap) var(--gutter) 0;
  box-sizing: border-box;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
  align-items: stretch;
  gap: 0.75rem;
  margin: 3.5rem 0 0;
  padding: 0;
  list-style: none;
}

.card {
  display: flex;
  flex-direction: column;
  padding: var(--card-pad);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-none);
  transition: box-shadow var(--duration-fast) ease;
}

.card:hover {
  box-shadow: var(--shadow-hover);
}

.index {
  display: block;
  margin-bottom: 2rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
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
  color: var(--color-text-muted);
  text-wrap: pretty;
}
</style>
