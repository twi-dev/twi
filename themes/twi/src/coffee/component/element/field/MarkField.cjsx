React = require "react"

TokenInput = require "../common/token/TokenInput"

class MarkField extends TokenInput
  placeholder: -> "Marks: Adventure, Slice of Life, Romance"

  endpoint: -> "/story/marks"

  renderListElement: ({name, color}) ->
    <div className="character-item-container cf">
      <div className="fl">{name}</div>
    </div>

module.exports = MarkField
