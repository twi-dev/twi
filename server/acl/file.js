import {defineAbility} from "@casl/ability"

import File from "server/model/File"

const getFileAbilities = user => defineAbility(allow => {
  allow("read", File)

  allow("manage", File, {userId: user.id})
})

export default getFileAbilities
