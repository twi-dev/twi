import {File} from "../../../db/entities.js"

import {procedure} from "../../procedures/base.js"
import {UserOutput} from "../../types/user/UserOutput.js"
import {UserUpdateInput} from "../../types/user/UserUpdateInput.js"
import {withAuthContext} from "../../middlewares/withAuthContext.js"

export const update = procedure
  .use(withAuthContext)
  .input(UserUpdateInput)
  .output(UserOutput)
  .mutation(async ({input, ctx: {orm, auth: {user}}}) => {
    const {avatar, ...fields} = input

    if (avatar) {
      user.avatar = orm.em.create(File, {key: avatar})
    } else if (avatar === null) {
      user.avatar = null
    }

    orm.em.assign(user, fields)

    await orm.em.flush()

    return user
  })
