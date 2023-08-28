<script setup lang="ts">
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

const {register, handleSubmit} = useForm<IUserLogInInput>({
  initialValues: {
    login: "",
    password: ""
  },
  validate: zodResolver(UserLogInInput),
  validateOnMounted: true,
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

const {value: loginValue, attrs: loginAttrs} = register("login")
const {value: passwordValue, attrs: passwordAttrs} = register("password")
</script>

<template>
  <FormAuth @submit="handleSubmit">
    <template #title>
      Login
    </template>

    <Field>
      <Label for="login">
        Your login
      </Label>

      <Input
        wide
        id="login"
        class="mb-2"
        type="text"
        placeholder="Login..."
        v-model="loginValue"
        v-bind="loginAttrs"
      />
    </Field>

    <Field>
      <Label for="login" class="text-neutral-500 dark:text-neutral-400">
        Your password
      </Label>

      <Input
        wide
        class="mb-2"
        type="password"
        placeholder="Password..."
        v-model="passwordValue"
        v-bind="passwordAttrs"
      />
    </Field>

    <template #submit>
      Log in
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
