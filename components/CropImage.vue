<script setup lang="ts">
import "cropperjs/dist/cropper.css"

import Cropper from "cropperjs"

export interface CropImageProps {
  src: string
  alt?: string
}

const props = defineProps<CropImageProps>()

const cropper = ref<Cropper>()
const el = ref<HTMLImageElement>()

onMounted(() => {
  if (el.value) {
    cropper.value = new Cropper(el.value, {
      aspectRatio: 1,
      viewMode: 2,
      dragMode: "move",
      zoomable: false
    })
  }
})

onUnmounted(() => {
  if (cropper.value) {
    cropper.value.destroy()
  }
})

onUpdated(() => {
  if (cropper.value) {
    // FIXME: Fix image flickering once it replaced
    cropper.value.replace(props.src)
  }
})
</script>

<template>
  <div>
    <img ref="el" :src="src" :alt="alt" class="block max-w-full" />
  </div>
</template>
