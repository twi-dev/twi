import {wrap} from "@decs/typeschema"

import {moveUploadedFile} from "../../../lib/uploads/utils/moveUploadedFile.js"
import {getImageMetadata} from "../../../lib/utils/getImageMetadata.js"
import {withAuthContext} from "../../middlewares/withAuthContext.js"
import {UserUpdateInput} from "../../valibot/user/UserUpdateInput.js"
import {UserOutput} from "../../valibot/user/UserOutput.js"
import {procedure} from "../../procedures/base.js"
import {File} from "../../../db/entities.js"

export const update = procedure
  .use(withAuthContext)
  .input(wrap(UserUpdateInput))
  .output(wrap(UserOutput))
  .mutation(async ({input, ctx: {orm, auth: {user}}}) => {
    const {avatar, ...fields} = input

    if (avatar) {
      const {
        key,
        sha512hash,
        size,
        mime,
        path
      } = await moveUploadedFile({
        id: avatar,
        owner: "user",
        kind: "avatar",
        accepts: "image/*"
      })

      const metadata = await getImageMetadata(path)

      user.avatar = orm.em.create(
        File,

        {
          key,
          size,
          sha512hash,
          mime,
          metadata
        },

        {
          persist: true
        }
      )
    } else if (avatar === null) {
      user.avatar = null
    }

    orm.em.assign(user, fields)

    await orm.em.flush()

    return user
  })
