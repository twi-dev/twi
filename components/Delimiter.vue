<script setup lang="ts">
interface Props {
  orientation?: "vertical" | "horizontal"
}

defineProps<Props>()
</script>

<template>
  <div
    :class='[
      "bg-neutral-200 dark:bg-neutral-800",

      {
        "w-px h-full": orientation === "vertical",
        "w-full h-px": orientation === "horizontal"
      }
    ]'
  />
</template>
