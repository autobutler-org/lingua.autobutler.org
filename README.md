# lingua.autobutler.org

The public site for [Lingua](https://github.com/autobutler-org/lingua), built with
[Nuxt](https://nuxt.com), typechecked with `vue-tsc`, and tested with Vitest.

Run `make` to see every target.

```sh
make setup    # install nvm, Node, and dependencies
make serve    # start the Nuxt dev server
make generate # statically generate the deployable site
make test     # run tests
make check    # lint, typecheck, and format checks
make fix      # apply lint and format fixes
```

## Layout

| Path               | What lives there                                             |
| ------------------ | ------------------------------------------------------------ |
| `app.vue`          | Root layout: header, background, `<NuxtPage />`, footer      |
| `pages/`           | Route components (`index.vue`, `playground.vue`)             |
| `components/`      | Components and their `__tests__` specs                       |
| `data/copy.ts`     | Typed page copy and outbound links                           |
| `data/sample.ts`   | Captured compiler output for the playground sample           |
| `assets/`          | Global styles                                                |
| `public/`          | Files copied verbatim into the build                         |
| `nuxt.config.ts`   | Nuxt configuration (site meta, self-hosted fonts)            |
| `vitest.config.ts` | Vitest-only Vite config for mounting components in isolation |

`~/` and `@/` are aliased to the project root, matching Nuxt's defaults.

## Playground

The playground is a Compiler Explorer layout for the factorial program in the
compiler's end-to-end tests. Tokens and the AST are stdout from `lingua lex`
and `lingua parse`. LIR, assembly, and the run trace are captured fixtures.
None of it is a live compile. Editing the source does not recompile. The
compiler does not print TIR, so that column says so.

## Environment

The site needs no environment variables. If you add one, only `NUXT_PUBLIC_`-prefixed
variables reach client code. The bundle is public, so nothing secret belongs in it.

## Deployment

CI generates the static site (`nuxt generate`) and tests it. CD does the same and publishes
`.output/public` to GitHub Pages on pushes to `main`.
