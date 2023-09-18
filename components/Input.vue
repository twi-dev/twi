<script setup lang="ts">
interface Props {
  wide?: boolean
  modelValue?: string
}

defineProps<Props>()
defineEmits(["update:modelValue"])
</script>

<template>
  <input
    :class="[
      'p-3 border border-gray-300 text-neutral-500 dark:text-neutral-400 rounded-md dark:bg-neutral-800 dark:border-neutral-600',

      {
        'w-full': wide === true
      },
    ]"

    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
