{PropTypes} = React = require "react"
{observer, inject} = require "mobx-react"

{container} = require "./token.styl"

TokenList = require "./TokenList"

TokenEditor = ({placeholder, selected, children, onChoosen, character}) ->
  _onFocus = => character.isActive = yes

  _onBlur = => character.isActive = no

  _onChange = ({target: {value}}) => character.current = value

  <div
    className="#{container}" tabIndex={-1}
    onFocus={_onFocus} onBlur={_onBlur}
  >
    <input
      type="text"
      placeholder="#{placeholder}"
      onChange={_onChange}
      value={character.current}
    />
    <TokenList
      tokens={selected}
      isActive={character.isActive}
      onChoosen={onChoosen}
    >
      {children}
    </TokenList>
  </div>

TokenEditor.defaultProps =
  placeholder: "Type a token..."
  selected: []

TokenEditor.propTypes =
  placeholder: PropTypes.string
  selected: PropTypes.array
  children: PropTypes.element

module.exports = inject("character")(observer TokenEditor)
