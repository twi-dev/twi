<script setup lang="ts">
import LogoIcon from "../../assets/logo.svg"
</script>

<template>
  <form class="flex flex-col gap-8 py-12 px-10 border border-gray-100 dark:border-neutral-600 shadow-2xl dark:shadow-none rounded-lg bg-white dark:bg-neutral-800">
    <div class="flex flex-col justify-center items-center gap-2">
      <LogoIcon class="w-14 h-14" :font-controlled="false" />

      <div class="text-xl select-none text-center">
        <slot name="title" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <slot />
    </div>

    <div>
      <slot name="actions">
        <button type="submit" class="btn btn-block btn-primary no-animation">
          <slot name="submit" />
        </button>
      </slot>
    </div>

    <div class="text-sm">
      <slot name="links" />
    </div>
  </form>
</template>
