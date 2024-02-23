<script setup lang="ts">
import LogoIcon from "../../assets/logo.svg"

interface Props {
  valid?: boolean
}

defineProps<Props>()
</script>

<template>
  <form class="flex flex-col gap-8 py-12 px-10 border border-gray-100 dark:border-neutral-600 shadow-2xl dark:shadow-none rounded-lg bg-white dark:bg-neutral-800">
    <div class="flex flex-col justify-center items-center gap-2">
      <LogoIcon class="w-14 h-14" :font-controlled="false" />

      <div class="text-xl select-none text-center">
        <slot name="title" />
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <slot />
    </div>

    <slot name="actions">
      <Button :disabled="!valid">
        <slot name="submit" />
      </Button>
    </slot>

    <div class="text-sm">
      <slot name="links" />
    </div>
  </form>
</template>
