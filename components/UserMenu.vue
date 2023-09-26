<script setup lang="ts">
import {Popover, PopoverPanel} from "@headlessui/vue"
import type {User} from "next-auth"

export interface UserMenuProps {
  user: User
}

const props = defineProps<UserMenuProps>()

const {signOut} = useAuth()

const avatarUrl = computed(() => {
  const {avatar} = props.user
  if (avatar) {
    return `/uploads/${avatar.key}`
  }

  return undefined
})

async function logOut(close: () => void) {
  try {
    await signOut()
    close()
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <Popover class="relative w-8 h-8">
    <slot />

    <PopoverPanel v-slot="{close}" class="absolute top-0 right-0 w-72 bg-white dark:bg-neutral-800 rounded-md shadow-md dark:shadow-none border border-neutral-200 dark:border-neutral-600">
      <div class="py-5 px-5 text-center flex flex-col items-center">
        <AvatarEditable size="md" :src="avatarUrl" />

        <div class="pt-2">
          Hi, {{user.login}}!
        </div>
      </div>

      <Delimiter class="!bg-neutral-600" />

      <UserMenuItem class="px-5" @click="logOut(close)">
        Log out
      </UserMenuItem>
    </PopoverPanel>
  </Popover>
</template>
