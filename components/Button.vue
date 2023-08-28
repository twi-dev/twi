<script setup lang="ts">
type Variants = "primary" | "secondary"

type Colors = "red" | "brand"

type Shapes = "square" | "circle"

// ! Vue doesn't support this kind of props
interface Props {
  variant?: Variants
  color?: Colors
  shape?: Shapes
  wide?: boolean
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  shape: "square",
  disabled: false,
  wide: ({wide = false, shape}) => shape === "circle" ? false : wide
})
</script>

<template>
  <button
    :disabled="disabled"
    :class='[
      "text-center",

      {
        "w-full": wide,
        "py-2 px-6 rounded-md": shape === "square",
        "p-2 rounded-full": shape === "circle",
        "relative cursor-progress": loading,
        "disabled:cursor-not-allowed": disabled && !loading,
        "disabled:bg-gray-400 disabled:dark:bg-slate-600": (variant === "primary" && !loading),
        "disabled:border-gray-300 disabled:text-gray-300 bg-transparent active:disabled:bg-transparent dark:disabled:border-slate-500 dark:disabled:text-slate-500": variant === "secondary",
        "bg-blue-500 active:bg-blue-600 text-white": variant === "primary" && (!color || color === "brand"),
        "bg-white active:bg-gray-200 border dark:bg-slate-700 dark:text-white dark:active:bg-slate-600": variant === "secondary",
        "border-gray-200 bg-white active:bg-gray-200 text-black": variant === "secondary" && !color,
        "bg-red-500 active:bg-red-600 text-white": variant === "primary" && color === "red",
        "border-blue-500 text-blue-500 active:bg-blue-200": variant === "secondary" && color === "brand",
        "border-red-500 text-red-500 active:bg-red-100": variant === "secondary" && color === "red"
      }
    ]'>
      <slot />
    </button>
</template>
