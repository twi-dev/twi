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

useHeadSafe({
  title: "Signup"
})

const {handleSubmit, fields, errors} = useSignupForm()
const {value: emailValue, attrs: emailAttrs} = fields.email
const {value: loginValue, attrs: loginAttrs} = fields.login
const {value: passwordValue, attrs: passwordAttrs} = fields.password

const {isValid} = useIsFormVaid(errors)
</script>

<template>
  <FormAuth :valid="isValid" @submit="handleSubmit">
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
          v-bind="emailAttrs"
          v-model="emailValue"
          wide
          type="email"
          placeholder="Email"
        />
      </Field>

      <Field>
        <Label for="login">
          Your new login
        </Label>

        <Input
          id="login"
          v-bind="loginAttrs"
          v-model="loginValue"
          wide
          type="text"
          placeholder="Login"
        />
      </Field>

      <Field>
        <Label for="password">
          Create a passowrd
        </Label>

        <Input
          id="password"
          v-bind="passwordAttrs"
          v-model="passwordValue"
          wide
          type="password"
          placeholder="Password"
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
