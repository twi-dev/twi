<script setup lang="ts">
import {useNuxtApp, watch} from "#imports"

const {$trpc} = useNuxtApp()

const {data: message, error} = await $trpc.hello.useQuery()

watch(error, () => console.error(error))
</script>

<template>
  {{message}}
</template>
