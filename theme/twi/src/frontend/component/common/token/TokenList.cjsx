{PropTypes} = React = require "react"
cm = require "classnames"

{list, active} = require "./token.styl"

TokenListItem = require "./TokenListItem"

###
# Render list of tokens taken from remote server
#
# @params object props:
#   * array tokens – List of tokens taken from remote server
#   * boolean isActive – Show this list?
#   * boolean creatable – Enable adding custom tokens?
#   * function onChoosen – Callback for choosen token
###
TokenList = ({tokens, isActive, creatable, children, onChoosen}) ->
  listElements = for token, idx in tokens
    <TokenListItem key={idx} token={token} onChoosen={onChoosen}>
      {children}
    </TokenListItem>

  <ul className={cm list, "#{active}": isActive}>
    {listElements}
  </ul>

TokenList.defaultProps =
  isActive: no
  creatable: no

TokenList.propTypes =
  tokens: PropTypes.array.isRequired
  # onChoosen: PropTypes.func.isRequired
  isActive: PropTypes.bool
  creatable: PropTypes.bool
  children: PropTypes.element

module.exports = TokenList
