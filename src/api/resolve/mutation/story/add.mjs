// import Chapter from "db/model/Chapter"
import Story from "db/model/Story"

import auth from "core/auth/checkUser"
import bind from "core/helper/graphql/bindResolver"

async function addStory({args, ctx}) {
  // TODO: Add chapters creation from here
  return Story.create({...args.story, userId: ctx.state.user.id})
}

export default addStory |> bind |> auth
