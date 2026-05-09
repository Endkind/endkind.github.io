<script setup lang="ts">
  const props = defineProps<{
    theme: string,
    display_name: string,
  }>()
</script>

<template>
  <input
      type="radio"
      name="theme-dropdown"
      class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
      :aria-label="props.display_name"
      :value="props.theme"
  />
</template>

<style scoped>

</style>