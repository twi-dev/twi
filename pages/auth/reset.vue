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

    <div class="flex flex-col gap-8">
      <Field>
        <Label for="email">
          Your email address
        </Label>

        <Input id="email" placeholder="Email..." />
      </Field>

      <div class="text-center p-3 border border-neutral-700 border-dotted rounded-md select-none">
        The instructions will be send to this email address, so fill this field carefully.
      </div>
    </div>

    <template #submit>
      Restore password
    </template>

    <template #links>
      <div class="text-center flex flex-col gap-2">
        <NuxtLink href="/auth/login">
          Log in here if you remember your password
        </NuxtLink>
      </div>
    </template>
  </FormAuth>
</template>
