import {hash} from "bcryptjs"

import prompt from "setup/helper/prompt"

import log from "system/log"
import getConfig from "system/base/getConfig"

import createConnection from "server/api/core/base/database"
import User from "server/api/database/model/User"

const getMainInfo = async () => await prompt({
  login: "Your login:",
  email: "Your E-mail address",
})

async function getPassword() {
  let res = null
  while (true) {
    res = await prompt({
      password: [{
        type: "password",
        message: "Your password:"
      }],
      repass: [{
        type: "password",
        message: "Repeat password:"
      }]
    })

    if (res.password === res.repass) {
      break
    }

    log.warn("Too bad. Password confirmation failed.")
  }

  return await hash(res.password, 15)
}

async function createSU(env) {
  const {database} = await getConfig("api", env)
  await createConnection(database)

  const user = await getMainInfo()

  const password = await getPassword()

  const role = User.roles.su

  const su = new User({
    ...user, password, role
  })

  await su.save()
}

export default createSU
