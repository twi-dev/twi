import {useForm} from "react-hook-form"
import {useRouter} from "next/router"

import toast from "react-hot-toast"

import api from "lib/rest/api"

import Button from "component/Button"
import Input from "component/Input"

import Title from "../Title"
import Container from "../Container"
import Fields from "../Fields"

/** @type {React.FC<{compact?: boolean}>} */
const Login = ({compact}) => {
  const {register, handleSubmit: handle} = useForm()

  const router = useRouter()

  /**
   * @param {{username: string, password: string}} credentials
   *
   * @return {Promise<void>}
   */
  const submit = credentials => api.post("/auth/login", credentials)
    .then(() => router.push("/"))
    .catch(error => {
      console.error(error)
      toast.error("Can't log in")
    })

  return (
    <Container>
      <form onSubmit={handle(submit)}>
        <Title title="Login" compact={compact} />

        <Fields compact={compact}>
          <Input
            ref={register}
            type="email"
            name="username"
            placeholder="Email or username"
          />

          <Input
            ref={register}
            type="password"
            name="password"
            placeholder="Password"
          />

          <Button type="submit">Log in</Button>
        </Fields>
      </form>
    </Container>
  )
}

export default Login
