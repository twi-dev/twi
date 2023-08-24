<script setup lang="ts">
import {
  definePageMeta,
  useHead,
  useNuxtApp,
  useRouter,
  useIsFormVaid
} from "#imports"

import {useForm} from "@vorms/core"
import {zodResolver} from "@vorms/resolvers/zod"

import type {
  IUserSignUpInput
} from "../../server/trpc/types/user/UserSignUpInput.js"
import {UserSignUpInput} from "../../server/trpc/types/user/UserSignUpInput.js"

definePageMeta({
  layout: "auth",
})

useHead({
  title: "Signup"
})

const {$trpc} = useNuxtApp()

const router = useRouter()

const {register, handleSubmit, errors} = useForm<IUserSignUpInput>({
  initialValues: {
    login: "",
    email: "",
    password: ""
  },
  validate: zodResolver(UserSignUpInput),
  validateMode: "input",
  reValidateMode: "input",
  async onSubmit(data) {
    try {
      await $trpc.user.create.mutate(data)
      await router.replace("/")
    } catch (error) {
      console.error(data)
    }
  }
})

const {isInvalid} = useIsFormVaid(errors)

const {value: emailValue, attrs: emailAttrs} = register("email")

const {value: loginValue, attrs: loginAttrs} = register("login")

const {value: passwordValue, attrs: passwordAttrs} = register("password")
</script>

<template>
  <form @submit="handleSubmit">
    <input
      type="email"
      class="border"
      placeholder="Email"
      v-model="emailValue"
      v-bind="emailAttrs"
    />

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
      Sign up
    </button>
  </form>
</template>
