<script setup lang="ts">
import {Pencil} from "lucide-vue-next"
import {isEmpty} from "lodash-es"
import {Uppy} from "@uppy/core"

import Tus from "@uppy/tus"

import type {MaybeUndefined} from "../lib/utils/types/MaybeUndefined.js"

import type {AvatarProps} from "./Avatar.vue"

import Modal from "./Modal.vue"

defineProps<AvatarProps>()

const {$trpc} = useNuxtApp()
const {getSession} = useAuth()

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

const modalRef = ref<InstanceType<typeof Modal>>()
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

  const id = uppy.addFile({
    name: file.name,
    type: file.type,
    data: file,
    source: "Local",
    isRemote: false
  })

  return id
}

const onFileSelected = (files: File[] | null) => {
  if (!files) {
    return
  }

  const [file] = files

  try {
    // Add new file(s)
    updateFile(file)

    selected.value = file

    updatePreview(selected.value)

    modalRef.value?.open()
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
    .then(async ({successful}) => {
      if (isEmpty(successful)) {
        return
      }

      const [uploaded] = successful

      // Update user avatar
      await $trpc.user.update.mutate({avatar: uploaded.uploadURL})
      await getSession()

      if (modalRef.value) {
        modalRef.value.close()
      }
    })
    .catch(console.error)
}

function onModalClose() {
  cleanup()
}

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <Avatar class="relative" v-bind="$props">
    <InputFile
      plain
      class="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center bg-white dark:bg-neutral-800 rounded-full"
      @change="onFileSelected"
    >
      <Pencil :size="16" class="text-black dark:text-white" />
    </InputFile>

    <Modal ref="modalRef" @close="onModalClose">
      <template #title>
        Crop
      </template>

      <template #default="{close}">
        <div class="p-6">
          <CropImage round :preview="preview" alt="Avatar" @crop="onCrop">
            <template #default="{crop}">
              <div class="flex">
                <Button variant="secondary" @click="close">
                  Cancel
                </Button>

                <div class="flex-1" />

                <Button @click="crop">
                  Save
                </Button>
              </div>
            </template>
          </CropImage>
        </div>
      </template>
    </Modal>
  </Avatar>
</template>
