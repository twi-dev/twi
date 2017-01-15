{createElement} = React = require "react"
{observer, inject} = require "mobx-react"

TokenEditor = require "component/common/token/TokenEditor"

CharacterEditor = ({character, children, selected, placeholder}) ->
  <TokenEditor
    token={character}, selected={selected} placeholder={placeholder}
  >
    {children}
  </TokenEditor>

module.exports = inject("character")(observer CharacterEditor)
