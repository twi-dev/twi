<script setup lang="ts">
interface Props {
  orientation?: "vertical" | "horizontal"
}

withDefaults(defineProps<Props>(), {
  orientation: "horizontal"
})
</script>

<template>
  <div
    :class="[
      'bg-neutral-200 dark:bg-neutral-800',

      {
        'w-px h-full': orientation === 'vertical',
        'w-full h-px': orientation === 'horizontal'
      }
    ]"
  />
</template>
