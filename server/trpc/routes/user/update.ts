import {moveUploadedFile} from "../../../lib/uploads/utils/moveUploadedFile.js"
import {withAuthContext} from "../../middlewares/withAuthContext.js"
import {UserUpdateInput} from "../../types/user/UserUpdateInput.js"
import {UserOutput} from "../../types/user/UserOutput.js"
import {procedure} from "../../procedures/base.js"
import {File} from "../../../db/entities.js"

export const update = procedure
  .use(withAuthContext)
  .input(UserUpdateInput)
  .output(UserOutput)
  .mutation(async ({input, ctx: {orm, auth: {user}}}) => {
    const {avatar, ...fields} = input

    if (avatar) {
      const {key} = await moveUploadedFile({
        id: avatar,
        owner: "user",
        kind: "avatar",
        accepts: "image/*"
      })

      user.avatar = orm.em.create(File, {key})
    } else if (avatar === null) {
      user.avatar = null
    }

    orm.em.assign(user, fields)

    await orm.em.flush()

    return user
  })
