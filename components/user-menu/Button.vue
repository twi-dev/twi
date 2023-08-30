<script setup lang="ts">
import {PopoverButton} from "@headlessui/vue"
</script>

<template>
  <PopoverButton class="outline-none">
    <slot />
  </PopoverButton>
</template>
