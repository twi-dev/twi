import {procedure} from "../../procedures/base.js"

import {User} from "../../../db/entity/User.js"

import {UserOutput} from "../../types/user/UserOutput.js"
import {UserCreateInput} from "../../types/user/UserCreateInput.js"

export const create = procedure
  .input(UserCreateInput)
  .output(UserOutput)
  .mutation(async ({input, ctx: {orm}}) => {
    const user = orm.em.create(User, input)

    await orm.em.persistAndFlush(user)

    return user
  })
