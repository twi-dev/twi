<script setup lang="ts">
import {useNuxtApp} from "#imports"

const {$trpc} = useNuxtApp()

const {data: message} = await $trpc.hello.useQuery()
</script>

<template>
  <div>
    {{message}}
  </div>
</template>
