import {hash} from "bcryptjs"

import prompt from "setup/helper/prompt"

import log from "core/log"
import getConfig from "core/base/getConfig"

import createConnection from "core/base/database"
import User from "database/model/User"

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
  const {database} = await getConfig(env)

  const connection = await createConnection(database)

  // TODO: Maybe needs some improvements.
  if (await User.findOne({role: User.roles.su})) {
    await connection.close()

    return log.warn(
      "Can't continue the operation because the owner already exists."
    )
  }

  const user = await getMainInfo()

  const password = await getPassword()

  const role = User.roles.su

  const status = User.statuses.activated

  // TODO: Don't forget to receive greetings message for owner
  await User({...user, password, role, status}).save()

  await connection.close()
}

export default createSU
