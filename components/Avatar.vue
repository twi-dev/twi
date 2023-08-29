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
  <div class="rounded-full border-2 border-neutral-200 dark:border-neutral-900">
    <div class="flex items-center justify-center rounded-full w-8 h-8 border-2 border-white">
      <User2 class="text-neutral-200 dark:text-white" />
    </div>
  </div>
</template>
