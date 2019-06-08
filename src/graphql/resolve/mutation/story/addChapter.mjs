import Story from "db/model/Story"

import check from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"

const addChapter = params => Story.addChapter(params)

export default addChapter |> bind |> check
