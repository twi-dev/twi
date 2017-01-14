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
TokenList = ({tokens, isActive, creatable, template, onChoosen}) ->
  listElements = for token, idx in tokens
    <TokenListItem key={idx} token={token} onChoosen={onChoosen}>
      {template}
    </TokenListItem>

  <ul className={cm list, "#{active}": isActive}>
    {listElements}
  </ul>

# {li for li in listElements}

TokenList.defaultProps =
  isActive: no
  creatable: no

TokenList.propTypes =
  tokens: PropTypes.array.isRequired
  # onChoosen: PropTypes.func.isRequired
  isActive: PropTypes.bool
  creatable: PropTypes.bool

module.exports = TokenList
