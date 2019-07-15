import bind from "core/helper/db/bindHookParams"

async function validateChapters(doc) {
  if (!doc.chapters) {
    doc.isDraft = true
    doc.isFinished = false
  }
}

export default validateChapters |> bind
