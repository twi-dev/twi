import {valibotResolver} from "@vorms/resolvers/valibot"
import {useForm} from "@vorms/core"

import type {AuthResponse} from "../lib/auth/AuthResponse.js"
import {isAuthOkResponse} from "../lib/auth/isAuthOkResponse.js"

import {
  UserSignUpInput,
  type IUserSignUpInput
} from "../server/trpc/types/user/UserSignUpInput.js"

export function useSignupForm() {
  const {$trpc} = useNuxtApp()
  const {replace} = useRouter()
  const {signIn} = useAuth()

  const form = useForm<IUserSignUpInput>({
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

  const fields = {
    email: form.register("email"),
    login: form.register("login"),
    password: form.register("password")
  } as const

  return {...form, fields} as const
}
