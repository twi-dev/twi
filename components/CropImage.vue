<script setup lang="ts">
/* eslint-disable @typescript-eslint/indent */

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
  preview: string
  options?: CropImageOptions
  alt?: string
}

const props = withDefaults(defineProps<CropImageProps>(), {
  preview: undefined,
  round: false,
  alt: "",
  options: () => ({
    aspectRatio: 1,
    viewMode: 3,
    dragMode: "none",
    zoomable: false,
    autoCropArea: 1,
    toggleDragModeOnDblclick: false
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

onUpdated(() => {
  if (cropper.value && props.preview) {
    // FIXME: Fix image flickering once it replaced
    cropper.value.replace(props.preview)
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

<style>
.round-crop {
  & .cropper-face, & .cropper-view-box {
    @apply rounded-full;
  }
}
</style>

<template>
  <div :class="['w-full', {'round-crop': round}]">
    <div class="w-full mb-5 overflow-hidden" :style="{aspectRatio: options.aspectRatio}">
      <img ref="el" :src="preview" :alt="alt" class="block max-w-full" />
    </div>

    <slot :crop="crop" />
  </div>
</template>
