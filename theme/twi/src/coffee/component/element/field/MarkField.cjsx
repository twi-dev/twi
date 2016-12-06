React = require "react"

TokenInput = require "../common/token/TokenInput"

class MarkField extends TokenInput
  placeholder: -> "Marks: Adventure, Slice of Life, Romance"

  endpoint: -> "/story/marks"

  listFilter: ({id}) => id in @props.choosen

  chooseOnClick: ({dataset: {id}}) => id

  renderListElement: ({id, name, color}) ->
    <div className="character-item-container cf" data-id={id}>
      <div className="fl">{name}</div>
    </div>

module.exports = MarkField
