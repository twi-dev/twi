{Component, PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

requireDefault = require "requireDefault"
fetch = require "helper/wrapper/fetch"
isEmpty = require "lodash/isEmpty"

TokenStore = requireDefault require "store/component/token/Token"

class TokenEditor extends Component
  @propTypes =
    tokenStore: PropTypes.instanceOf TokenStore

  ###
  # Request tokens from remote server by given value
  #
  # @param string current
  #
  # @return any
  ###
  request: (current) =>
    unless isEmpty endpoint = do @endpoint
      return await fetch "#{endpoint}/#{current}?ref=ed"

  ###
  # Should return true for choosen items
  ###
  listFilter: => # noop

  ###
  # Choose token on click
  #
  # @param Element
  ###
  chooseOnClick: => # noop

  ###
  # Choose token by key down (by "enter" or "tab")
  ###
  chooseOnKeyDown: => # noop

  _onChange: ({target: {value}}) =>
    return if isEmpty value

    console.log value

  placeholder: "Start typing token here"

  endpoint: -> ""

  render: ->
    <div className="container">
      <input
        type="text"
        placeholder="#{@placeholder}"
        onChange={@_onChange}
      />
      <div className="list"></div>
    </div>

module.exports = TokenEditor

