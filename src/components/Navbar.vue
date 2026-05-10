<script setup lang="ts">
  import Theme from "./Navbar/Theme.vue";
  import profile from "@json/github/profile.json";

  const themes = [
    { theme: "default", display_name: "Auto" },
    { theme: "light", display_name: "Light" },
    { theme: "dark", display_name: "Dark" },
    { theme: "cupcake", display_name: "Cupcake" },
    { theme: "bumblebee", display_name: "Bumblebee" },
    { theme: "emerald", display_name: "Emerald" },
    { theme: "corporate", display_name: "Corporate" },
    { theme: "synthwave", display_name: "Synthwave" },
    { theme: "retro", display_name: "Retro" },
    { theme: "cyberpunk", display_name: "Cyberpunk" },
    { theme: "valentine", display_name: "Valentine" },
    { theme: "halloween", display_name: "Halloween" },
    { theme: "garden", display_name: "Garden" },
    { theme: "forest", display_name: "Forest" },
    { theme: "aqua", display_name: "Aqua" },
    { theme: "lofi", display_name: "Lofi" },
    { theme: "pastel", display_name: "Pastel" },
    { theme: "fantasy", display_name: "Fantasy" },
    { theme: "wireframe", display_name: "Wireframe" },
    { theme: "black", display_name: "Black" },
    { theme: "luxury", display_name: "Luxury" },
    { theme: "dracula", display_name: "Dracula" },
    { theme: "cmyk", display_name: "CMYK" },
    { theme: "autumn", display_name: "Autumn" },
    { theme: "business", display_name: "Business" },
    { theme: "acid", display_name: "Acid" },
    { theme: "lemonade", display_name: "Lemonade" },
    { theme: "night", display_name: "Night" },
    { theme: "coffee", display_name: "Coffee" },
    { theme: "winter", display_name: "Winter" },
    { theme: "dim", display_name: "Dim" },
    { theme: "nord", display_name: "Nord" },
    { theme: "sunset", display_name: "Sunset" },
    { theme: "caramellatte", display_name: "Caramellatte" },
    { theme: "abyss", display_name: "Abyss" },
    { theme: "silk", display_name: "Silk" },
  ];
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm relative z-50">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost text-xl">
        <img
            :src="profile.avatar_url"
            class="h-10 w-auto rounded-full"
            :alt="profile.name"
            loading="lazy"
            decoding="async" />
        {{ profile.name }}
      </a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
<!--        <li><a>Link</a></li>-->
<!--        <li>
          <details>
            <summary>Parent</summary>
            <ul class="bg-base-100 rounded-t-none p-2">
              <li><a>Link 1</a></li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>-->
        <li>
          <details>
            <summary>Theme</summary>
            <ul>
              <li class="menu-title text-xs">Theme</li>
              <li v-for="t in themes" :key="t.theme">
                <Theme :theme="t.theme" :display_name="t.display_name" />
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>