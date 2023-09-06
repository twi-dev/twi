<script setup lang="ts">
import {Pencil} from "lucide-vue-next"
import {Uppy} from "@uppy/core"

import Tus from "@uppy/tus"

import type {MaybeUndefined} from "../lib/utils/types/MaybeUndefined.js"
import {getFileIDFromURL} from "../lib/uploads/getFileIDFromURL.js"

import type {AvatarProps} from "./Avatar.vue"
import {isEmpty} from "lodash-es"

defineProps<AvatarProps>()

const {$trpc} = useNuxtApp()

const uppy = new Uppy({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 10000000, // 10 MB
    allowedFileTypes: [".jpeg", ".jpg", ".png"]
  }
})
  .use(Tus, {
    endpoint: "/uploads"
  })

const preview = ref<MaybeUndefined<string>>()
const selected = ref<File>()

const cleanupFiles = () => uppy
  .getFiles()
  .forEach(({id}) => uppy.removeFile(id))

function cleanup(): void {
  cleanupFiles()

  if (preview.value) {
    URL.revokeObjectURL(preview.value)
  }

  preview.value = undefined
  selected.value = undefined
}

function updatePreview(file: File): string {
  preview.value = URL.createObjectURL(file)

  return preview.value
}

function updateFile(file: File): string {
  cleanupFiles()

  const id =  uppy.addFile({
    name: file.name,
    type: file.type,
    data: file,
    source: "Local",
    isRemote: false
  })

  return id
}

const onChange = (files: File[] | null) => {
  if (!files) {
    return
  }

  const [file] = files

  try {
    // Add new file(s)
    updateFile(file)

    selected.value = file

    updatePreview(selected.value)
  } catch (error) {
    console.error(error)
  }
}

function onCrop(blob: Blob) {
  if (!selected.value) {
    throw new Error("Can't find selected file")
  }

  const croppedFile = new File([blob], selected.value.name, {
    type: unref(selected.value).type
  })

  updateFile(croppedFile)

  uppy.upload()
    .then(({successful}) => {
      if (isEmpty(successful)) {
        return
      }

      const [uploaded] = successful

      const id = getFileIDFromURL(uploaded.uploadURL)

      // Update user avatar
      return $trpc.user.update.mutate({
        avatar: id
      })
    })
    .catch(console.error)
}

onUnmounted(() => {
  cleanup()
})
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
        <div v-if="preview" class="overflow-hidden">
          <CropImage round :src="preview" alt="Avatar" @crop="onCrop" />
        </div>

        <div class="pt-5">
          <InputFile @change="onChange">
            Choose a file
          </InputFile>
        </div>
      </div>
    </Modal>
  </Avatar>
</template>
