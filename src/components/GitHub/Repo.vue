<script setup lang="ts">
  import type {GitHubRepo} from "@ts/schemas/github.ts";
  import languageColors from "@json/github/language_colors.json";
  import codeForkSvgRaw from "@assets/Font-Awesome/code-fork.svg?raw";
  import starSvgRaw from "@assets/Bootstrap-Icons/start.svg?raw";
  import githubSvgRaw from "@assets/Bootstrap-Icons/github.svg?raw";
  import globeSvgRaw from "@assets/Bootstrap-Icons/globe.svg?raw";

  const props = defineProps<{
    repo: GitHubRepo,
  }>()

  const getLanguageColor = (language: string | null): string => {
    if (!language) return "#9ca3af";
    return (languageColors as Record<string, string>)[language] ?? "#9ca3af";
  };

  const codeForkSvg = codeForkSvgRaw.replace("<svg ", "<svg class=\"w-3 h-3\" ");
  const starSvg = starSvgRaw.replace("<svg ", "<svg class=\"w-3 h-3\" ");
  const githubSvg = githubSvgRaw.replace("<svg ", "<svg class=\"w-3 h-3\" ");
  const globeSvg = globeSvgRaw.replace("<svg ", "<svg class=\"w-3 h-3\" ");
</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm">
    <div class="card-body">
      <div class="flex justify-between">
        <a :href="props.repo.url" target="_blank" class="card-title">{{ props.repo.name }}</a>
        <div class="flex gap-1">
          <div v-if="props.repo.is_template" class="badge">Template</div>
          <div v-if="props.repo.archived" class="badge">Archived</div>
        </div>
      </div>
      <p>{{ props.repo.description }}</p>
      <div class="card-actions">
        <div class="badge gap-2">
          <span
            class="inline-block h-2.5 w-2.5 rounded-full"
            :style="{ backgroundColor: getLanguageColor(props.repo.language) }"
          ></span>
          {{ props.repo.language ?? "Unknown" }}
        </div>
        <a :href="props.repo.url + '/stargazers'" target="_blank" class="badge gap-1 text-base-content" v-if="props.repo.stars > 0">
          <span aria-hidden="true" v-html="starSvg"></span>
          {{ props.repo.stars }}
        </a>
        <a :href="props.repo.url + '/forks'" target="_blank" class="badge gap-1 text-base-content" v-if="props.repo.forks > 0">
          <span aria-hidden="true" v-html="codeForkSvg"></span>
          {{ props.repo.forks }}
        </a>
        <a :href="props.repo.pages_url" target="_blank" class="badge gap-1 text-base-content" v-if="props.repo.pages_url">
          <span aria-hidden="true" v-html="githubSvg"></span>
          Visit GitHub Pages
        </a>
        <a :href="props.repo.homepage" target="_blank" class="badge gap-1 text-base-content" v-if="props.repo.homepage">
          <span aria-hidden="true" v-html="globeSvg"></span>
          Visit Homepage
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>