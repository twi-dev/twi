import {AbilityBuilder as Builder} from "@casl/ability"

import File from "server/model/File"

const getFileAbilities = user => Builder.define(allow => {
  allow("read", File)

  allow("manage", File, {userId: user.id})
})

export default getFileAbilities
