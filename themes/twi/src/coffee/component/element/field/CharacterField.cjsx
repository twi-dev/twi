React = require "react"

TokenInput = require "../common/token/TokenInput"

class CharacterField extends TokenInput
  placeholder: -> "Characters: Pinkie Pie, Applejack, Fluttershy"

  endpoint: -> "/story/characters"

  renderListElement: ({name, pic}) ->
    <div className="character-item-container cf">
      <div className="character-item-pic fl">
        <img src="/images/characters/#{pic}" alt={name} />
      </div>
      <div className="character-item-name fl">{name}</div>
    </div>

module.exports = CharacterField
