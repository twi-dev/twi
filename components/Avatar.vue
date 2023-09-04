<script setup lang="ts">
import {User2} from "lucide-vue-next"

type AvatarSizes = "sm" | "md" | "lg"

interface Props {
  size?: AvatarSizes
}

withDefaults(defineProps<Props>(), {
  size: "sm"
})

export type AvatarProps = Props
</script>

<template>
  <div
    :class='[
      {
        "w-8 h-8": size === "sm",
        "w-20 h-20": size === "md",
        "w-32": size === "lg"
      }
    ]'
  >
    <div class="w-full h-full rounded-full border-2 border-black dark:border-white flex items-center justify-center overflow-hidden">
      <User2 class="text-black-200 dark:text-white w-full h-full" />
    </div>

    <slot />
  </div>
</template>
