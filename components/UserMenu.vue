<script setup lang="ts">
import {Popover, PopoverPanel} from "@headlessui/vue"
import type {User} from "next-auth"

export interface UserMenuProps {
  user: User
}

const props = defineProps<UserMenuProps>()

const avatarUrl = computed(() => {
  const {avatar} = props.user
  if (avatar) {
    return `/api/uploads/${avatar.key}`
  }

  return undefined
})
</script>

<template>
  <Popover class="relative">
    <slot />

    <PopoverPanel v-slot="{close}" class="absolute top-0 right-0 w-72 bg-white dark:bg-neutral-800 px-5 rounded-md shadow-md dark:shadow-none border border-neutral-200 dark:border-neutral-800">
      <div class="py-5 text-center flex flex-col items-center">
        <AvatarEditable size="md" :src="avatarUrl" />

        <div class="pt-2">
          Hi, {{user.login}}!
        </div>
      </div>

      <Delimiter class="!bg-white" />

      <UserMenuItem @click="close">
        Log out
      </UserMenuItem>
    </PopoverPanel>
  </Popover>
</template>
