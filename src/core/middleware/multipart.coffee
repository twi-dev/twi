busboy = require "async-busboy"
{unlink} = require "promise-fs"

ALLOWED_TYPES = [
  "odt"
  "docx"
]

multipart = (ctx, next) ->
  return await do next unless ctx.get "multipart/*"

  formData = await busboy ctx.req

  # for file in formData.files when not file in ALLOWED_TYPES
  #   await unlink file.path
  #   throw new Error "Unallowed file type #{file.mime}"

  await do next

  for file in formData.files
    try
      await unlink file.path
    catch err
      throw err unless err is "ENOENT"

  formData = null
  return

module.exports = multipart
