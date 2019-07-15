import bind from "core/helper/db/bindHookParams"

const updateDate = query => query.update({
  $set: {"dates.updatedAt": Date.now()}
})

export default updateDate |> bind
