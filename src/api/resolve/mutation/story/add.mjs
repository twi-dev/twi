import getUserAbilities from "db/model/User/abilities"
import toFile from "db/model/Story/util/toFile"
import Chapter from "db/model/Chapter"
import Story from "db/model/Story"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import bind from "core/helper/graphql/bindResolver"
import waterfall from "core/helper/array/runWaterfall"

import Forbidden from "core/error/http/Forbidden"

async function addStory({args, ctx}) {
  const {story} = args

  const aclUser = getUserAbilities(ctx.state.user)

  if (aclUser.cannot("create")) {
    throw new Forbidden("You cannot create the new stories")
  }

  if (story.chapters) {
    story.chapters = await waterfall([
      () => Promise.all(story.chapters.map(({content}) => toFile(content))),

      files => File.createMany(files),

      files => files.map(({id}) => id),

      files => story.chapters.map((ch, idx) => ({...ch, content: files[idx]})),

      chapters => Chapter.createMany(chapters),

      chapters => chapters.map(({id}) => id)
    ])
  }

  return Story.create({...story, userId: ctx.state.user.id})
}

export default addStory |> auth |> bind
