<script setup lang="ts">
definePageMeta({
  layout: "auth"
})
</script>

<template>
  <FormAuth>
    <template #title>
      Restore password
    </template>

    <Input placeholder="Email..." />

    <template #submit>
      Restore password
    </template>
  </FormAuth>
</template>
