<script setup lang="ts">

import {provideSessionContext} from "../context/session.js"

const {getSession} = useAuth()

const session = ref(await getSession())

async function refresh(): Promise<void> {
  const fresh = await getSession()

  if (!(fresh || session.value)) {
    return
  }

  session.value = fresh
}

provideSessionContext({session, refresh})
</script>

<template>
  <slot />
</template>
