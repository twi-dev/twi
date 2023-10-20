<script setup lang="ts">
import {useForm} from "@vorms/core"
import {valibotResolver} from "@vorms/resolvers/valibot"

import type {
  IUserSignUpInput
} from "../../server/trpc/types/user/UserSignUpInput.js"
import {UserSignUpInput} from "../../server/trpc/types/user/UserSignUpInput.js"
import {isAuthOkResponse} from "../../lib/auth/isAuthOkResponse.js"
import type {AuthResponse} from "../../lib/auth/AuthResponse.js"
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
const {replace} = useRouter()
const {signIn} = useAuth()

const {register, handleSubmit} = useForm<IUserSignUpInput>({
  initialValues: {
    login: "",
    email: "",
    password: ""
  },
  validate: valibotResolver(UserSignUpInput),
  validateMode: "input",
  reValidateMode: "input",
  validateOnMounted: true,
  async onSubmit(data) {
    try {
      await $trpc.user.create.mutate(data)

      const response: AuthResponse = await signIn("credentials", {
        ...data,
        redirect: false
      })

      if (isAuthOkResponse(response)) {
        return replace("/")
      }

      console.error(response.error)
    } catch (error) {
      console.error(error)
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
