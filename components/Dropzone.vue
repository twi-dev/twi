<script setup lang="ts">
import type {MaybeNull} from "../lib/utils/types/MaybeNull.js"

type Emits = {
  (type: "change", files: MaybeNull<File[]>): void
}

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const dropzoneRef = ref<HTMLButtonElement>()

const normalizefiles = (
  files: MaybeNull<File[] | FileList>
): MaybeNull<File[]> => files ? Array.from(files) : null

const onFiles = (
  files: MaybeNull<File[]>
) => emit("change", normalizefiles(files))

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit("change", normalizefiles(target.files))

  // Reset value so event will be fired even if the same file is chosen
  // @ts-expect-error
  target.value = null
}

const dropZoneRes = useDropZone(dropzoneRef, onFiles)
</script>

<template>
  <button ref="dropzoneRef" type="button" @click="inputRef?.click()">
    <input ref="inputRef" type="file" class="hidden" @change="onChange" accept="image/*" />

    <slot v-bind="dropZoneRes" />
  </button>
</template>
