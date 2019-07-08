import User from "db/model/User"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import bind from "core/helper/graphql/bindResolver"
import BadRequest from "core/error/http/BadRequest"

async function updateAvatar({args, ctx}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  const file = await File.findById(user.avatar)

  if (!file) {
    throw new BadRequest("Can't find such file.")
  }

  return file.updateContent(args.file)
    .then(({id}) => user.updateAvatar(id))
}

export default updateAvatar |> bind |> auth
