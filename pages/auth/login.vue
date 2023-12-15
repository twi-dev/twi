<script setup lang="ts">
import type {AuthMeta} from "../../lib/auth/AuthMeta.js"

definePageMeta({
  layout: "auth",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/"
  } satisfies AuthMeta
})

useHead({
  title: "Login"
})

const {handleSubmit, fields} = useLoginForm()
const {value: loginValue, attrs: loginAttrs} = fields.login
const {value: passwordValue, attrs: passwordAttrs} = fields.password
</script>

<template>
  <FormAuth @submit="handleSubmit">
    <template #title>
      Log in to your account
    </template>

    <Field>
      <Label for="login">
        Your login
      </Label>

      <Input
        id="login"
        v-model="loginValue"
        wide
        type="text"
        placeholder="Login..."
        v-bind="loginAttrs"
      />
    </Field>

    <Field>
      <Label for="password">
        Your password
      </Label>

      <Input
        id="password"
        v-model="passwordValue"
        wide
        type="password"
        placeholder="Password..."
        v-bind="passwordAttrs"
      />
    </Field>

    <template #submit>
      Continue
    </template>

    <template #links>
      <div class="text-center flex flex-col gap-2">
        <div>
          <NuxtLink href="/auth/reset">
            Forgot your password?
          </NuxtLink>
        </div>

        <div>
          <NuxtLink href="/auth/signup">
            Don't have an account? Sign up here
          </NuxtLink>
        </div>
      </div>
    </template>
  </FormAuth>
</template>
