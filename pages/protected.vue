<script setup ts="ts">
import {useNuxtApp, watch} from "#imports"

const {$trpc} = useNuxtApp()

const {data: login, error} = await $trpc.protected.useQuery()

watch(error, () => console.error(error))
</script>

<template>
  <div v-if="login">
    Authorized as {{login}}
  </div>

  <div v-else>
    {{ error ?? "No error object received, good luck debugging :D" }}
  </div>
</template>
