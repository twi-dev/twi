{PropTypes} = React = require "react"
{observer, inject} = require "mobx-react"

{container} = require "./token.styl"

TokenList = require "./TokenList"

TokenEditor = ({placeholder, selected, children, onChoosen, token}) ->
  _onFocus = => token.isActive = yes

  _onBlur = => token.isActive = no

  _onChange = ({target: {value}}) => token.current = value

  <div
    className="#{container}" tabIndex={-1}
    onFocus={_onFocus} onBlur={_onBlur}
  >
    <input
      type="text"
      placeholder="#{placeholder}"
      onChange={_onChange}
      value={token.current}
    />
    <TokenList
      tokens={token.suggestions}
      isActive={token.isActive}
      onChoosen={onChoosen}
    >{children}</TokenList>
  </div>

TokenEditor.defaultProps =
  placeholder: "Type a token..."
  selected: []

TokenEditor.propTypes =
  placeholder: PropTypes.string
  selected: PropTypes.array
  children: PropTypes.element

module.exports = observer TokenEditor
