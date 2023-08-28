<script setup lang="ts">
import FullscreenMain from "../components/FullscreenMain.vue"
</script>

<template>
  <FullscreenMain>
    <div class="w-full m-auto p-5 mobile:w-mobile">
      <slot />
    </div>
  </FullscreenMain>
</template>
