<script setup lang="ts">
interface Props {
  wide?: boolean
}

withDefaults(defineProps<Props>(), {
  wide: false
})

const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"

    :class="[
      'border border-gray-300 focus:outline-offset-1 focus:outline-gray-300 focus:outline-double dark:border-neutral-600 dark:focus:outline-neutral-600 p-3 rounded-md bg-inherit',

      {
        'w-full': wide === true
      },
    ]"
  />
</template>
