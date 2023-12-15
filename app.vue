<script setup lang="ts">
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
  @apply bg-white text-neutral dark:bg-neutral-900 dark:text-white;
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
