<script setup lang="ts">
import {User2} from "lucide-vue-next"

type AvatarSizes = "sm" | "md" | "lg"

interface Props {
  size?: AvatarSizes
}

withDefaults(defineProps<Props>(), {
  size: "sm"
})
</script>

<template>
  <div
    :class='[
      "rounded-full border-2 border-black dark:border-white overflow-hidden",

      {
        "w-8 h-8": size === "sm",
        "w-20 h-20": size === "md",
        "w-32": size === "lg"
      }
    ]'
  >
    <div class="w-full h-full flex items-center justify-center">
      <User2 class="text-black-200 dark:text-white w-full h-full" />
    </div>
  </div>
</template>
