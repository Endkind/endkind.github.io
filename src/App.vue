<script setup lang="ts">
  import { watchEffect } from "vue";
  import Navbar from "@components/Navbar.vue";
  import Repo from "@components/GitHub/Repo.vue";
  import repos from "@json/github/repos.json";
  import profile from "@json/github/profile.json";

  watchEffect(() => {
    document.title = profile.name || "GitHub Repos";
  });
</script>

<template>
  <div class="mx-20">
    <nav class="mb-6">
      <Navbar />
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
