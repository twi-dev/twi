{PropTypes} = React = require "react"

{container} = require "./token.styl"

TokenList = require "./TokenList"

TokenEditor = ({placeholder, selected}) ->
  _onFocus = => console.log "Focused"

  _onBlur = => console.log "Blur"

  <div
    className="#{container}" tabIndex={-1}
    onFocus={_onFocus} onBlur={_onBlur}
  >
    <input
      type="text"
      placeholder="#{placeholder}"
    />
    <TokenList tokens={[name: "Pinkie Pie"]} />
  </div>

TokenEditor.defaultProps =
  placeholder: "Type a token..."
  selected: []

TokenEditor.propTypes =
  placeholder: PropTypes.string
  selected: PropTypes.array

module.exports = TokenEditor
