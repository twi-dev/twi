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
  title: "Signup"
})

const {handleSubmit, fields} = useSignupForm()
const {value: emailValue, attrs: emailAttrs} = fields.email
const {value: loginValue, attrs: loginAttrs} = fields.login
const {value: passwordValue, attrs: passwordAttrs} = fields.password
</script>

<template>
  <FormAuth @submit="handleSubmit">
    <template #title>
      Create an account
    </template>

    <div class="flex flex-col gap-2">
      <Field>
        <Label for="email">
          Your email
        </Label>

        <Input
          id="email"
          v-model="emailValue"
          wide
          type="email"
          placeholder="Email"
          v-bind="emailAttrs"
        />
      </Field>

      <Field>
        <Label for="login">
          Your new login
        </Label>

        <Input
          id="login"
          v-model="loginValue"
          wide
          type="text"
          placeholder="Login"
          v-bind="loginAttrs"
        />
      </Field>

      <Field>
        <Label for="password">
          Create a passowrd
        </Label>

        <Input
          id="password"
          v-model="passwordValue"
          wide
          type="password"
          placeholder="Password"
          v-bind="passwordAttrs"
        />
      </Field>
    </div>

    <template #submit>
      Continue
    </template>

    <template #links>
      <div class="text-center flex flex-col gap-2">
        <NuxtLink href="/auth/login">
          Already have one? Log in here
        </NuxtLink>
      </div>
    </template>
  </FormAuth>
</template>
