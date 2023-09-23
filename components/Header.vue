<script setup lang="ts">
import {User2} from "lucide-vue-next"
import {isEmpty} from "lodash-es"

import {useSessionContext} from "../context/session.js"

const {session} = useSessionContext()

const avatarUrl = computed(() => {
  if (!session.value) {
    return undefined
  }

  const {avatar} = session.value.user
  if (avatar) {
    return `/uploads/${avatar.key}`
  }

  return undefined
})
</script>

<template>
  <header
    ref="headerRef"
    class="sticky top-0 py-3 px-5 desktop:px-0 bg-white/75 dark:bg-neutral-900/70 backdrop-blur backdrop-filter border-b border-neutral-200 dark:border-neutral-800"
  >
    <DesktopContainer class="flex flex-row items-center">
      <div role="logo">
        <NuxtLink href="/" class="no-underline text-inherit">
          Twilight's Library
        </NuxtLink>
      </div>

      <div class="flex-1" />

      <div>
        <NuxtLink v-if="isEmpty(session)" href="/auth/login">
          <User2 />
        </NuxtLink>

        <UserMenu v-else :user="session.user!">
          <UserMenuButton>
            <Avatar :src="avatarUrl" />
          </UserMenuButton>
        </UserMenu>
      </div>
    </DesktopContainer>
  </header>
</template>
