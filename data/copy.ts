/**
 * Page copy and outbound links. Captured compiler output lives in sample.ts.
 */

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface Fact {
  readonly label: string;
  readonly value: string;
}

export interface Rail {
  readonly name: string;
  readonly body: string;
}

export interface Stage {
  readonly name: string;
  readonly body: string;
}

export const repoUrl = "https://github.com/autobutler-org/lingua";
export const orgSiteUrl = "https://autobutler.org";
export const specUrl = `${repoUrl}/blob/main/docs/lingua1.md`;

const ledeFirst =
  "Lingua is a small language in the Python and TypeScript mold (`fn`, `match`, `List<T>`, double-quoted strings, blocks closed with `end`).";

export const site = {
  name: "Lingua",
  url: "https://lingua.autobutler.org",
  description: ledeFirst.replaceAll("`", ""),
} as const;

export const masthead = {
  wordmark: "Lingua",
  links: [
    { label: "Playground", href: "/playground" },
    { label: "Source", href: repoUrl },
    { label: "AutoButler", href: orgSiteUrl },
  ] as readonly Link[],
  /** The one solid button in the bar. Playground is also a nav link. */
  cta: { label: "Playground", href: "/playground" } as Link,
  menuLabel: "Menu",
} as const;

export const hero = {
  headline: "A language a checker can refuse",
  subhead: "Models write it. The compiler runs the examples.",
  sentences: [
    ledeFirst,
    "Source files are `.lf`.",
    "Every function except `main` has an example above the body, and the compiler runs it.",
    "Nominal types and bounded integers do not interchange.",
    "Expected failures are `Result`.",
    "`assert` and `fail` do not catch.",
    "`lingua build` emits one static linux/amd64 executable.",
  ] as readonly string[],
  spec: {
    before: "The normative spec is ",
    label: "docs/lingua1.md",
    href: specUrl,
    after: " in the compiler repository.",
  },
  primary: { label: "Playground", href: "/playground" } as Link,
  factsLabel: "Lingua at a glance",
  facts: [
    { label: "Extension", value: ".lf" },
    { label: "Examples", value: "Required, and executed" },
    { label: "Types", value: "Nominal" },
    { label: "Integers", value: "Bounded" },
    { label: "Output", value: "One static binary" },
    { label: "License", value: "CC0" },
  ] as readonly Fact[],
} as const;

export const features = {
  eyebrow: "01 — Language",
  heading: "Rails the checker enforces",
  items: [
    {
      name: "Example before the body",
      body: "Every function except `main` has an example above the body, and the compiler runs it.",
    },
    {
      name: "Named closers",
      body: "A declaration closes with its kind and name, as in `end fn factorial`.",
    },
    {
      name: "Bounded integers",
      body: "An integer type has an inclusive range, and a tighter range is not introduced implicitly.",
    },
    {
      name: "Nominal types",
      body: "`type CustomerId = Text` and `type Cursor = Text` do not unify.",
    },
    {
      name: "Closed matches",
      body: "A `match` on a closed type has to cover every variant.",
    },
    {
      name: "Declared effects",
      body: "A function declares its effects, and `pure` declares none.",
    },
    {
      name: "Comptime",
      body: "An ordinary function runs at compile time when the call is marked `comptime`.",
    },
    {
      name: "`check`, `fmt`, `pack`, `build`",
      body:
        "`lingua check` typechecks and runs examples, `lingua fmt` rewrites source into canonical layout, " +
        "`lingua pack` prints a file with the signatures it needs, and `lingua build` emits one static linux/amd64 executable.",
    },
  ] as readonly Rail[],
} as const;

export const pipeline = {
  eyebrow: "02 — Pipeline",
  heading: "Six columns from one program",
  lede: "Captured from the factorial program in the compiler's end-to-end tests.",
  link: { label: "Playground", href: "/playground" } as Link,
  stages: [
    {
      name: "Tokens",
      body: "The lexer prints one token per line, with its line and column.",
    },
    {
      name: "AST",
      body: "The parser prints the untyped tree as an S-expression.",
    },
    {
      name: "TIR",
      body: "The typechecker prints the typed IR, with a type on every expression.",
    },
    {
      name: "LIR",
      body: "Build lowers the checked program into this form.",
    },
    {
      name: "Assembly",
      body: "The linux/amd64 backend selects these instructions.",
    },
    {
      name: "Run",
      body: "The sample prints 0! through 5!, then 20!.",
    },
  ] as readonly Stage[],
} as const;

export const playground = {
  title: "Playground — Lingua",
  description:
    "Tokens, AST, TIR, LIR, assembly, and interpreter output for Lingua source, compiled in the browser.",
  note: "Samples are single-file programs from the compiler's end-to-end tests. Edits compile in the browser.",
  sampleLabel: "Sample program",
  sourceLabel: "Lingua source",
  outputLabel: "Compiler output",
  loading: "Loading the compiler...",
  runNote:
    "Run is the compiler's interpreter, in step with the native binary. A long main stops after 50,000,000 steps so the page can return; a built binary has no step cap. This page does not build the linux/amd64 executable.",
} as const;

export const errorPage = {
  notFoundHeading: "Page not found",
  notFoundBody: "Nothing is published at this address.",
  errorHeading: "Something went wrong",
  errorBody: "This page failed to load. Try again, or go back to a page that exists.",
  links: [
    { label: "Home", href: "/" },
    { label: "Playground", href: "/playground" },
  ] as readonly Link[],
} as const;

export const footer = {
  note: "Built by AutoButler. CC0.",
  links: masthead.links,
} as const;
