<script setup lang="ts">
import type {MaybeNull} from "../lib/utils/types/MaybeNull"
import {toFilesArray} from "../lib/utils/toFilesArray.js"

export interface InputFileProps {
  multiple?: boolean
  accept?: string
}

type Emits = {
  (type: "change", files: MaybeNull<File[]>): void
}

const emit = defineEmits<Emits>()

defineProps<InputFileProps>()

const inputRef = ref<HTMLInputElement>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  emit("change", toFilesArray(target.files))

  // Reset value so event will be fired even if the same file is chosen
  // @ts-expect-error Chrome might not trigger change event for the same file if we reset to an empty string
  target.value = null
}
</script>

<template>
  <Button type="button" @click="inputRef?.click()">
    <input ref="inputRef" type="file" class="hidden" v-bind="{accept, multiple}" @change="onChange" />
    <slot />
  </Button>
</template>
