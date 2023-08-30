<script setup lang="ts">
import {Popover, PopoverPanel} from "@headlessui/vue"
import type {PropType} from "vue"
import type {User} from "next-auth"

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})
</script>

<template>
  <Popover class="relative">
    <slot />

    <PopoverPanel class="absolute w-72 bg-white dark:bg-neutral-900 px-5 right-0 rounded-md shadow-md dark:shadow-none border border-neutral-200 dark:border-neutral-800">
      <div class="py-5 text-center flex flex-col items-center">
        <Avatar size="md" />

        <div>
          Hi, {{user.login}}!
        </div>
      </div>

      <Delimiter />

      <UserMenuItem>
        Menu item
      </UserMenuItem>
    </PopoverPanel>
  </Popover>
</template>
