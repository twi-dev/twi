React = require "react"

TokenEditor = require "component/extendable/token/TokenEditor"

class CharacterEditor extends TokenEditor
  placeholder: "Characters..."

  endpoint: -> "/stories/characters"

module.exports = CharacterEditor
