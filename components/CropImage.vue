<script setup lang="ts">
import Cropper from "cropperjs"

export interface CropImageProps {
  src: string
  alt?: string
}

defineProps<CropImageProps>()

const cropper = ref<Cropper>()
const el = ref<HTMLImageElement>()

onMounted(() => {
  if (el.value) {
    cropper.value = new Cropper(el.value, {
      aspectRatio: 1
    })
  }
})

onUnmounted(() => {
  if (cropper.value) {
    cropper.value.clear()
  }
})
</script>

<template>
  <div>
    <img ref="el" :src="src" :alt="alt" />
  </div>
</template>
