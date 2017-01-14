{PropTypes} = React = require "react"

{container} = require "./token.styl"

TokenList = require "./TokenList"

TokenEditor = ({placeholder, selected, children, onChoosen}) ->
  _onFocus = => console.log "Focused"

  _onBlur = => console.log "Blur"

  _onChange = ({target: {value}}) => console.log value if value

  <div
    className="#{container}" tabIndex={-1}
    onFocus={_onFocus} onBlur={_onBlur}
  >
    <input
      type="text"
      placeholder="#{placeholder}"
      onChange={_onChange}
    />
    <TokenList tokens={[name: "Pinkie Pie"]} onChoosen={onChoosen}>
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

module.exports = TokenEditor
