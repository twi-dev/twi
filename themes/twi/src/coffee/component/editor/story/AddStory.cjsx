StoryEditor = require "./StoryEditor"
preventBeforeSubmit = require "helper/decorator/preventBeforeSubmit"

{decorateMethods, decorateMethod} = require "decorator"

class StoryAdd extends StoryEditor
  submit: (e) => console.log "Submitting..."

module.exports = decorateMethods StoryAdd, [
  decorateMethod preventBeforeSubmit, "submit"
]
