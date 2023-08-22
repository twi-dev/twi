<script setup lang="ts">
import {useHead} from "#imports"

useHead({
  title: "Twilight's Library"
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :color="false" class="bg-blue-500" />

      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
