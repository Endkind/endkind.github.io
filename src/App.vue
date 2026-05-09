<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import Navbar from "@components/Navbar.vue";
import Repo from "@components/GitHub/Repo.vue";
import {GitHubUtils} from "@ts/utils/github.ts";
import profile from "@json/github/profile.json";
import type {GitHubRepo} from "@ts/schemas/github.ts";
import repos_json from "@json/github/repos.json";

const repos = ref<GitHubRepo[]>([]);

watchEffect(() => {
  document.title = profile.name || "GitHub Repos";
});

onMounted(async () => {
  try {
  repos.value = await GitHubUtils.get_repos_data(profile.name);
  } catch {
    repos.value = repos_json as GitHubRepo[];
  }

});
</script>

<template>
  <div class="mx-20">
    <nav class="mb-6">
      <Navbar/>
    </nav>
    <main>
      <h1 class="text-2xl font-bold mb-4">GitHub Repos ({{ repos.length }})</h1>
      <div class="flex flex-wrap gap-6 justify-center">
        <Repo
            v-for="repo in repos"
            :key="repo.id ?? repo.name"
            :repo="repo"
        />
      </div>
    </main>
  </div>
</template>
