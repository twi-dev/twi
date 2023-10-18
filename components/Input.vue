<script setup lang="ts">
interface Props {
  wide?: boolean
  modelValue?: string
}

defineProps<Props>()
defineEmits(["update:modelValue"])
</script>

<style>
.input-ghost {
  &, &:focus, &:focus-within {
    @apply bg-transparent;
  }
}
</style>

<template>
  <input
    :class="[
      'input input-ghost input-bordered',

      {
        'w-full': wide === true
      },
    ]"

    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
