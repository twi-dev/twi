<script setup lang="ts">
import {User2} from "lucide-vue-next"

type AvatarSizes = "sm" | "md" | "lg"

export interface AvatarProps {
  size?: AvatarSizes
  src?: string
}

// TODO: Use common type
interface ImageSize {
  width: number
  height: number
}

const toSquareSize = (size: number): ImageSize => ({width: size, height: size})

const sizes = Object.freeze<Readonly<Record<AvatarSizes, ImageSize>>>({
  sm: toSquareSize(32),
  md: toSquareSize(80),
  lg: toSquareSize(128)
})

const {size} = withDefaults(defineProps<AvatarProps>(), {
  size: "sm",
  src: undefined
})

const {width, height} = sizes[size] || sizes.sm
</script>

<template>
  <div
    :class="[
      {
        'w-8 h-8': size === 'sm',
        'w-20 h-20': size === 'md',
        'w-32 h-32': size === 'lg'
      }
    ]"
  >
    <div class="w-full h-full rounded-full border-2 border-black dark:border-white flex items-center justify-center overflow-hidden">
      <NuxtPicture v-if="src" :src="src" :width="width" :height="height" alt="My avatar" />

      <User2 v-else class="text-black-200 dark:text-white w-full h-full" />
    </div>

    <slot />
  </div>
</template>
