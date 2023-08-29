<script setup lang="ts">
import {User2} from "lucide-vue-next"
import {isEmpty} from "lodash-es"

const {getSession} = useAuth()

const session = await getSession()
</script>

<template>
  <header class="py-3 px-5 desktop:px-0 bg-transparent border-b border-neutral-200 dark:border-neutral-800">
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

        <Avatar v-else />
      </div>

    </DesktopContainer>
  </header>
</template>
