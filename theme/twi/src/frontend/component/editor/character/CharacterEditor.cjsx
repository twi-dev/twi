{createElement} = React = require "react"
{observer, inject} = require "mobx-react"

TokenEditor = require "component/common/token/TokenEditor"

###
# Note: This component extends TokenEditor
###
CharacterEditor = (props) ->
  {
    character, children
    placeholder, creatable
    selected, onChoosen, onRemoved
  } = props

  <TokenEditor
    token={character}, selected={selected}
    placeholder={placeholder}
    onChoosen={onChoosen}
    onRemoved={onRemoved}
  >
    {children}
  </TokenEditor>

module.exports = inject("character")(observer CharacterEditor)
