<script setup lang="ts">
import {Pencil} from "lucide-vue-next"
import {Uppy} from "@uppy/core"

import type {AvatarProps} from "./Avatar.vue"

defineProps<AvatarProps>()

const uppy = new Uppy()

uppy.on("file-added", files => console.log(files))

// TODO: Add crop
const onChange = (files: File[] | null) => {
  if (files) {
    uppy.addFiles(files.map(file => ({
      name: file.name,
      type: file.type,
      data: file,
      source: "Local",
      isRemote: false
    })))
  }
}
</script>

<template>
  <Avatar class="relative" v-bind="$props">
    <Modal>
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

      <Dropzone class="p-6" @change="onChange">
        Click to choose a file
      </Dropzone>
    </Modal>
  </Avatar>
</template>
