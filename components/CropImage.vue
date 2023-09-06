<script setup lang="ts">
import "cropperjs/dist/cropper.css"

import Cropper from "cropperjs"

import type {MaybeNull} from "../lib/utils/types/MaybeNull"

type Emits = {
  (type: "crop", blob: Blob): void
}

export type CropImageOptions = Omit<
  Cropper.Options<HTMLImageElement>,

  "crop" | "zoom" | "cropstart" | "cropmove" | "cropend" | "ready"
>

export interface CropImageProps {
  round?: boolean
  src: string
  alt?: string,
  options?: CropImageOptions
}

const props = withDefaults(defineProps<CropImageProps>(), {
  round: false,
  alt: "",
  options: () => ({
    aspectRatio: 1,
    viewMode: 2,
    dragMode: "none",
    zoomable: false,
    autoCropArea: 1,
    toggleDragModeOnDblclick: false,
  })
})

const emit = defineEmits<Emits>()

const cropper = ref<Cropper>()
const el = ref<HTMLImageElement>()

onMounted(() => {
  if (el.value) {
    cropper.value = new Cropper(el.value, props.options)
  }
})

onUnmounted(() => {
  if (cropper.value) {
    cropper.value.replace("") // A hack to prevent error because the image is removed before unmount
    cropper.value.destroy()
  }
})

onUpdated(() => {
  if (cropper.value) {
    // FIXME: Fix image flickering once it replaced
    cropper.value.replace(props.src)
  }
})

function onBlob(blob: MaybeNull<Blob>): void {
  if (blob) {
    emit("crop", blob)
  }
}

function crop(): void {
  const canvas = unref(cropper)?.getCroppedCanvas()

  if (!canvas) {
    return
  }

  canvas.toBlob(onBlob)
}
</script>

<template>
  <div class="w-full">
    <div class="w-full">
      <img ref="el" :src="src" :alt="alt" class="block max-w-full" />
    </div>

    <button type="button" @click="crop">
      Crop
    </button>
  </div>
</template>
