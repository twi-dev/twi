<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/vue"
import {X} from "lucide-vue-next"

type Emits = {
  (type: "close", ...args: never[]): void
}

const emit = defineEmits<Emits>()

const visible = ref(false)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function onClose(): void {
  close()
  emit("close")
}

defineExpose({open, close})
</script>

<template>
  <slot name="openButton" :open-dialog="open" />

  <Dialog :open="visible" as="div" class="relative z-10" @close="onClose">
    <div class="fixed inset-0 bg-black/40 dark:bg-black/70" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel class="w-full max-w-md flex flex-col bg-white dark:bg-neutral-800 rounded-md text-left align-middle">
          <DialogTitle as="div" class="flex p-6 w-full select-none">
            <h3 class="text-xl font-bold">
              <slot name="title" />
            </h3>

            <div class="flex-1" />

            <button type="button" @click="close">
              <X :size="28" class="text-white" />
            </button>
          </DialogTitle>

          <div class="px-6">
            <Delimiter orientation="horizontal" class="!bg-white" />
          </div>

          <slot v-bind="{open, close}" />
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
