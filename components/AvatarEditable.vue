<script setup lang="ts">
import {Pencil} from "lucide-vue-next"
import {Uppy} from "@uppy/core"

import type {MaybeUndefined} from "../lib/utils/types/MaybeUndefined.js"

import type {AvatarProps} from "./Avatar.vue"

defineProps<AvatarProps>()

const uppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 10000000, // 10 MB
    allowedFileTypes: [".jpeg", ".jpg", ".png"]
  }
})

const preview = ref<MaybeUndefined<string>>()

function cleanup(): void {
  const [file] = uppy.getFiles() ?? []

  if (!file) {
    return
  }

  if (file.preview) {
    URL.revokeObjectURL(file.preview)
  }

  uppy.removeFile(file.id)
  preview.value = undefined
}

// TODO: Add crop
const onChange = (files: File[] | null) => {
  if (!files) {
    return
  }

  // Clear file(s) from first
  cleanup()

  const [file] = files

  const previewUrl = URL.createObjectURL(file)

  try {
    // Add new file(s)
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
      source: "Local",
      isRemote: false,
      preview: previewUrl
    })

    preview.value = previewUrl
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Avatar class="relative" v-bind="$props">
    <Modal @close="cleanup">
      <template #openButton="{openDialog}">
        <button
          class="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center bg-black rounded-full"

          @click="openDialog"
        >
          <Pencil :size="16" />
        </button>
      </template>

      <template #title>
        Update avatar
      </template>

      <div class="p-6">
        <div v-show="preview" class="overflow-hidden">
          <img :src="preview" alt="avatar" />
        </div>

        <InputFile @change="onChange">
          Choose a file
        </InputFile>
      </div>
    </Modal>
  </Avatar>
</template>
