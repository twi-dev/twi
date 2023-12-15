import {valibotResolver} from "@vorms/resolvers/valibot"
import {useForm} from "@vorms/core"

import type {AuthResponse} from "../lib/auth/AuthResponse.js"
import {isAuthOkResponse} from "../lib/auth/isAuthOkResponse.js"

import {
  UserLogInInput,
  type IUserLogInInput
} from "../server/trpc/types/user/UserLogInInput.js"

export function useLoginForm() {
  const {replace} = useRouter()
  const {signIn} = useAuth()

  const form = useForm<IUserLogInInput>({
    initialValues: {
      login: "",
      password: ""
    },
    validate: valibotResolver(UserLogInInput),
    validateOnMounted: true,
    validateMode: "input",
    reValidateMode: "input",
    async onSubmit(data) {
      const response: AuthResponse = await signIn("credentials", {
        ...data, redirect: false
      })

      if (isAuthOkResponse(response)) {
        return replace("/")
      }

      console.error(response.error)
    }
  })

  const fields = {
    login: form.register("login"),
    password: form.register("password")
  } as const

  return {...form, fields} as const
}
