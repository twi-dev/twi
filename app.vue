<script setup lang="ts">
import {useHead} from "#imports"

useHead({
  titleTemplate(title) {
    const base = "Twilight's Library"

    if (title) {
      return `${title} – ${base}`
    }

    return base
  }
})
</script>

<style>
html, body {
  @apply bg-white dark:bg-neutral-900 dark:text-white;
}

a {
  @apply underline dark:text-neutral-400;
}
</style>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="false" class="bg-violet-500" />

    <NuxtPage />
  </NuxtLayout>
</template>
