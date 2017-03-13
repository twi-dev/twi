const User = ({string, number, date}) => ({
  userId: string(),
  login: string().required(), // Should be also unique
  email: string().required(), // Should be also unique
  gender: number().integer().default(null),
  role: (
    number()
      .integer()
      .min(0) // root
      .max(4) // regular user
      .default(4)
  ),
  password: string().required(),
  avatar: string().default(null),
  registeredAt: date(),
  contact: {
    vk: string().default(null),
    fb: string().default(null),
    twitter: string().default(null),
    email: string().default(null)
  }
})

const options = {
  pk: "userId"
}

export {options}
export default User
