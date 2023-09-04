<script setup lang="ts">
import {Pencil} from "lucide-vue-next"

import type {AvatarProps} from "./Avatar.vue"

type Emits = {
  (trigger: "click", event: MouseEvent): void
}

defineProps<AvatarProps>()

defineEmits<Emits>()
</script>

<template>
  <Avatar class="relative" v-bind="$props">
    <button
      class="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center bg-black rounded-full"

      @click='$emit("click", $event)'
    >
      <Pencil :size="16" />
    </button>
  </Avatar>
</template>
