<script setup lang="ts">
import {Pencil} from "lucide-vue-next"

type Emits = {
  (trigger: "click", event: MouseEvent): void
}

defineEmits<Emits>()
</script>

<template>
  <Avatar class="relative">
    <button
      class="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center bg-black rounded-full"

      @click='$emit("click", $event)'
    >
      <Pencil :size="16" />
    </button>
  </Avatar>
</template>
