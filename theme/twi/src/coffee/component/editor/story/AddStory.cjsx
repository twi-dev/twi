StoryEditor = require "./StoryEditor"
fetch = require "helper/wrapper/fetch"
preventBeforeSubmit = require "helper/decorator/preventBeforeSubmit"

{decorateMethods, decorateMethod} = require "decorator"

class StoryAdd extends StoryEditor
  submit: (body) => await fetch "/story/new", {method: "POST", body}

module.exports = decorateMethods StoryAdd, [
  decorateMethod preventBeforeSubmit, "submit"
]
