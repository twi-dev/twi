<script setup lang="ts">
import {LogOut, User2} from "lucide-vue-next"
import {isEmpty} from "lodash-es"

const {getSession} = useAuth()

const session = await getSession()
</script>

<template>
  <header class="p-5 desktop:px-0 bg-transparent border-b border-neutral-200 dark:border-neutral-800">
    <DesktopContainer class="flex flex-row">
      <div role="logo">
        Twilight's Library
      </div>

      <div class="flex-1" />

      <nav>
        <NuxtLink v-if="isEmpty(session)" href="/auth/login">
          <User2 />
        </NuxtLink>

        <LogOut v-else />
      </nav>

    </DesktopContainer>
  </header>
</template>
