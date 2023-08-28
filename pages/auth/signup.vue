<script setup lang="ts">
import {useForm} from "@vorms/core"
import {zodResolver} from "@vorms/resolvers/zod"

import type {
  IUserSignUpInput
} from "../../server/trpc/types/user/UserSignUpInput.js"
import {UserSignUpInput} from "../../server/trpc/types/user/UserSignUpInput.js"
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

const {$trpc} = useNuxtApp()

const router = useRouter()

const {register, handleSubmit} = useForm<IUserSignUpInput>({
  initialValues: {
    login: "",
    email: "",
    password: ""
  },
  validate: zodResolver(UserSignUpInput),
  validateMode: "input",
  reValidateMode: "input",
  validateOnMounted: true,
  async onSubmit(data) {
    try {
      await $trpc.user.create.mutate(data)
      await router.replace("/")
    } catch (error) {
      console.error(data)
    }
  }
})

const {value: emailValue, attrs: emailAttrs} = register("email")
const {value: loginValue, attrs: loginAttrs} = register("login")
const {value: passwordValue, attrs: passwordAttrs} = register("password")
</script>

<template>
  <FormAuth @submit="handleSubmit">
    <template #title>
      Signup
    </template>

    <div class="flex flex-col gap-2">
      <Field>
        <Label for="email">
          Your email
        </Label>

        <Input
          wide
          id="email"
          type="email"
          placeholder="Email"
          v-model="emailValue"
          v-bind="emailAttrs"
        />
      </Field>

      <Field>
        <Label for="login">
          Your new login
        </Label>

        <Input
          wide
          id="login"
          type="text"
          placeholder="Login"
          v-model="loginValue"
          v-bind="loginAttrs"
        />
      </Field>

      <Field>
        <Label for="password">
          Create a passowrd
        </Label>

        <Input
          wide
          id="password"
          type="password"
          placeholder="Password"
          v-model="passwordValue"
          v-bind="passwordAttrs"
        />
      </Field>
    </div>

    <template #submit>
      Sign up
    </template>

    <template #links>
      <div class="text-center flex flex-col gap-2">
        <NuxtLink href="/auth/login">
          Already have an account? Log in here
        </NuxtLink>
      </div>
    </template>
  </FormAuth>
</template>
