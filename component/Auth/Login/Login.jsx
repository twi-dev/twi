import {useForm} from "react-hook-form"
import {useRouter} from "next/router"

import toast from "react-hot-toast"

import api from "lib/rest/api"

import Button from "component/Button"
import Input from "component/Input"

/** @type {React.FC} */
const Login = () => {
  const {register, handleSubmit: handle} = useForm()

  const router = useRouter()

  /**
   * @param {{email: string, password: string}} credentials
   */
  const submit = credentials => api.post("/auth/login", credentials)
    .then(() => router.push("/"))
    .catch(error => {
      console.error(error)
      toast.error("Authentication failed.")
    })

  return (
    <div>
      <form onSubmit={handle(submit)}>
        <Input
          ref={register}
          name="email"
          placeholder="Email"
        />

        <Input
          ref={register}
          type="password"
          name="password"
          placeholder="Password"
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Login
