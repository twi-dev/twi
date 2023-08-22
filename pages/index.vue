<script setup lang="ts">
import {useNuxtApp} from "#imports"

const {$trpc} = useNuxtApp()

const message = await $trpc.hello.query()
</script>

<template>
  <div>
    {{message}}
  </div>
</template>
