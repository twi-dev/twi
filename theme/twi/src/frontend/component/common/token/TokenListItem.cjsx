{PropTypes} = React = require "react"

{element} = require "./token.styl"

defaultTemplate = ({name}) -> name or "foo"

TokenListItem = ({token, children}) ->
  render = children or defaultTemplate

  <li className="#{element}">
    {render token}
  </li>

TokenListItem.propTypes =
  token: PropTypes.object
  children: PropTypes.element

module.exports = TokenListItem
