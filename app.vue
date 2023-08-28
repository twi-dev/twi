<script setup lang="ts">
import {useHead} from "#imports"

useHead({
  title: "Twilight's Library"
})
</script>

<style lang="postcss">
body {
  @apply bg-white dark:bg-neutral-900 dark:text-white;
}

a {
  @apply underline dark:text-neutral-400;
}
</style>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="false" class="bg-blue-500" />

    <NuxtPage />
  </NuxtLayout>
</template>
