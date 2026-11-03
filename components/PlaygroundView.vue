<script setup lang="ts">
import { computed, ref } from "vue";

import { playground } from "~/data/copy";

const props = defineProps<{
  readonly assembly: string;
  readonly ast: string;
  readonly lir: string;
  readonly runOutput: string;
  readonly sampleSource: string;
  readonly tir: string;
  readonly tokens: string;
}>();

const stages = [
  { id: "tokens", label: "Tokens" },
  { id: "ast", label: "AST" },
  { id: "tir", label: "TIR" },
  { id: "lir", label: "LIR" },
  { id: "assembly", label: "Assembly" },
  { id: "run", label: "Run" },
] as const;

type StageId = (typeof stages)[number]["id"];

const source = ref(props.sampleSource);
const selected = ref<StageId>("tokens");

const matchesSample = computed(() => source.value === props.sampleSource);

const captured = computed(() => ({
  tokens: props.tokens,
  ast: props.ast,
  tir: props.tir,
  lir: props.lir,
  assembly: props.assembly,
  run: props.runOutput,
}));

const panelText = computed(() =>
  matchesSample.value ? captured.value[selected.value] : playground.notEmbedded
);

const showRunNote = computed(() => matchesSample.value && selected.value === "run");

function select(id: StageId): void {
  selected.value = id;
}
</script>

<template>
  <main class="playground">
    <p class="note">{{ playground.note }}</p>
    <div class="columns">
      <section class="pane source" aria-label="Source">
        <div class="pane-label">Source</div>
        <textarea
          v-model="source"
          spellcheck="false"
          :aria-label="playground.sourceLabel"
        ></textarea>
      </section>
      <section class="pane output" :aria-label="playground.outputLabel">
        <div class="tabs" role="tablist" aria-label="Compiler output">
          <button
            v-for="stage in stages"
            :id="`tab-${stage.id}`"
            :key="stage.id"
            type="button"
            role="tab"
            :aria-selected="selected === stage.id"
            :aria-controls="`panel-${stage.id}`"
            @click="select(stage.id)"
          >
            {{ stage.label }}
          </button>
        </div>
        <div
          :id="`panel-${selected}`"
          class="tabpanel"
          role="tabpanel"
          :aria-labelledby="`tab-${selected}`"
        >
          <pre>{{ panelText }}</pre>
          <p v-if="showRunNote" class="run-note">{{ playground.runNote }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height));
}

.note {
  margin: 0;
  padding: 0.85rem var(--gutter);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

.columns {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr);
}

.pane {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 22rem;
}

.source {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-canvas);
}

.output {
  background: var(--color-surface-sunken);
}

.pane-label,
.tabs {
  display: flex;
  align-items: center;
  height: 2.75rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-canvas);
}

.pane-label {
  padding: 0 0.9rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.tabs {
  overflow-x: auto;
}

.tabs button {
  flex: none;
  height: 100%;
  padding: 0 0.9rem;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-small);
  cursor: pointer;
}

.tabs button[aria-selected="true"] {
  color: var(--color-text-strong);
  box-shadow: inset 0 -2px 0 var(--color-text-strong);
}

.tabpanel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

textarea,
pre {
  flex: 1;
  min-height: 16rem;
  margin: 0;
  padding: 1rem var(--gutter);
  box-sizing: border-box;
  border: 0;
  overflow: auto;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: var(--text-small);
  line-height: 1.55;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

textarea {
  resize: vertical;
}

pre {
  tab-size: 2;
}

.run-note {
  margin: 0;
  padding: 0.85rem var(--gutter) 1.1rem;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

@media (min-width: 960px) {
  .columns {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .pane {
    min-height: calc(100vh - var(--header-height) - 3.25rem);
  }

  .source {
    border-bottom: 0;
    border-right: 1px solid var(--color-border);
  }

  textarea {
    resize: none;
  }

  textarea,
  pre {
    min-height: 0;
  }
}
</style>
