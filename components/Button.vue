<script setup lang="ts">
export type ButtonVariants = "primary" | "secondary"

export type ButtonColors = "red" | "brand"

export type ButtonShapes = "square" | "circle"

export interface ButtonProps {
  variant?: ButtonVariants
  color?: ButtonColors
  shape?: ButtonShapes
  wide?: boolean
  disabled?: boolean
  loading?: boolean
  plain?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  color: "brand",
  variant: "primary",
  shape: "square",
  disabled: false,
  plain: false,

  wide: ({wide = false, shape}) => shape === "circle" ? false : wide
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'text-center',

      !plain && {
        border: true,
        'w-full': wide,
        'py-3 px-5 rounded-md': shape === 'square',
        'p-2 rounded-full': shape === 'circle',
        'relative cursor-progress': loading,
        'disabled:cursor-not-allowed': disabled && !loading,
        'disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-200 disabled:dark:border-neutral-700 disabled:dark:bg-neutral-700 disabled:dark:text-neutral-500': (variant === 'primary' && !loading),
        'disabled:border-gray-300 disabled:text-gray-300 bg-transparent active:disabled:bg-transparent dark:disabled:border-slate-500 dark:disabled:text-slate-500': variant === 'secondary',
        'bg-violet-500 active:bg-violet-600 border-violet-500 text-white': variant === 'primary' && (!color || color === 'brand'),
        'bg-white active:bg-gray-200 dark:bg-transparent dark:text-white dark:active:bg-slate-600': variant === 'secondary',
        'border-gray-200 bg-white active:bg-gray-200 text-black': variant === 'secondary' && !color,
        'bg-red-500 active:bg-red-600 text-white': variant === 'primary' && color === 'red',
        'border-violet-500 text-violet-500 active:bg-violet-200': variant === 'secondary' && color === 'brand',
        'border-red-500 text-red-500 active:bg-red-100': variant === 'secondary' && color === 'red'
      }
    ]"
  >
    <slot />
  </button>
</template>
