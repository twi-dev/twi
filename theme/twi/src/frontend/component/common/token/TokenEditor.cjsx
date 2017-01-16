{PropTypes} = React = require "react"
{observer, inject, PropTypes: {observableArray}} = require "mobx-react"

{container} = require "./token.styl"

TokenList = require "./TokenList"

###
# Token editor component
#
# Note: Do not use this component directly, decorate this one instead :)
#
# @param object props:
#   * Token token – TokenEditor store
#   * React.Element children – Custom template for TokenList
#   * string placeholder
#   * mobx.ObservableArray selected – List of selected tokens
#   * function onChoosen
#   * function onRemoved
###
TokenEditor = (props) ->
  {
    token, children, placeholder, creatable, selected, onChoosen, onRemoved
  } = props

  ###
  # Show TokenList on focus
  ###
  _onFocus = => token.isActive = yes

  ###
  # Hide TokenList on focus out
  ###
  _onBlur = => token.isActive = no

  ###
  # Request suggestions by current token name
  ###
  _onChange = ({target: {value}}) => token.request value

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

TokenEditor.propTypes =
  children: PropTypes.element
  placeholder: PropTypes.string
  selected: observableArray.isRequired

module.exports = observer TokenEditor
