# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Script Tasks Runner

Automatisierungen laufen uber `scripts/tasks.ts` und laden alle Dateien in `scripts/tasks/*.ts` in alphabetischer Reihenfolge.

- Basisklasse: `scripts/core/Task.ts`
- Beispieltask: `scripts/tasks/00-example.task.ts`

Scripts:

- `pnpm run tasks:run` kompiliert Script-TS und fuhrt alle Tasks aus
- `pnpm run dev` fuhrt zuerst Tasks aus und startet dann Vite
- `pnpm run build` fuhrt zuerst Tasks aus und baut dann die App


