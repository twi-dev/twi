<script setup lang="ts">
import {
  definePageMeta,
  useHead,
  useIsFormVaid,
  useAuth,
  useRouter
} from "#imports"

import {useForm} from "@vorms/core"
import {zodResolver} from "@vorms/resolvers/zod"

import type {AuthMeta} from "../../lib/auth/AuthMeta.js"
import type {AuthResponse} from "../../lib/auth/AuthResponse.js"
import {isAuthOkResponse} from "../../lib/auth/isAuthOkResponse.js"

import type {
  IUserLogInInput
} from "../../server/trpc/types/user/UserLogInInput.js"
import {UserLogInInput} from "../../server/trpc/types/user/UserLogInInput.js"

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

const {replace} = useRouter()
const {signIn} = useAuth()

const {register, handleSubmit, errors} = useForm<IUserLogInInput>({
  initialValues: {
    login: "",
    password: ""
  },
  validate: zodResolver(UserLogInInput),
  validateMode: "input",
  reValidateMode: "input",
  async onSubmit(data) {
    const response: AuthResponse = await signIn("credentials", {
      ...data,
      redirect: false
    })

    if (isAuthOkResponse(response)) {
      return replace("/")
    }

    console.error(response.error)
  }
})

const {isInvalid} = useIsFormVaid(errors)

const {value: loginValue, attrs: loginAttrs} = register("login")

const {value: passwordValue, attrs: passwordAttrs} = register("password")
</script>

<template>
  <form @submit="handleSubmit">
    <input
      type="text"
      class="border"
      placeholder="Login"
      v-model="loginValue"
      v-bind="loginAttrs"
    />

    <input
      type="password"
      class="border"
      placeholder="Password"
      v-model="passwordValue"
      v-bind="passwordAttrs"
    />

    <button type="submit" :disabled="isInvalid">
      Log in
    </button>
  </form>
</template>
