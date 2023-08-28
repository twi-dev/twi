<script setup lang="ts">
interface Props {
  wide?: boolean
}

defineProps<Props>()
</script>

<template>
  <input
  :class='[
      "p-3 border border-gray-300 text-neutral-500 dark:text-neutral-400 rounded-md dark:bg-neutral-900 dark:border-neutral-600",

      {
        "w-full": wide === true
      },
    ]'
  />
</template>
