{Component, PropTypes} = React = require "react"

isEmpty = require "lodash/isEmpty"
fetch = require "helper/wrapper/fetch"
keys = require "helper/util/keysMap"

class TokenInput extends Component
  @propTypes:
    choosen: PropTypes.array.isRequired
    onChange: PropTypes.func.isRequired

  constructor: ->
    @state =
      showList: no
      current: ""
      suggested: []

  renderTokensList: ->

  placeholder: -> "Type your token here..."

  endpoint: -> ""

  ###
  # This method should extends to use
  #
  # @param any
  #
  # @return React.ReactElement
  ###
  renderListElement: -> # noop

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

  chooseOnKeyDown: => # noop

  ###
  # Get tokens from remote server by current value
  #
  # @param Event
  ###
  _getTokens: ({target: {value}}) =>
    return @setState current: "", suggested: [], showList: no if isEmpty value

    onRejected = (err) => console.error err

    updateSuggested = (suggested) =>
      @setState {current: value, suggested, showList: yes}

    @request value
      .then updateSuggested, onRejected

  _onClick: ({currentTarget}) =>
    @setState current: "", ->
      @props.onChange @chooseOnClick currentTarget.firstChild

  ###
  # Show list of suggested tokens when TokentInput focused
  ###
  _showListOnFocus: => @setState showList: yes unless isEmpty @state.current

  _hideListOnBlur: => @setState showList: no

  _renderToken: (token, key) ->
    <li key={key} onClick={@_onClick}>{@renderListElement token}</li>

  _renderTokensList: ->
    return if isEmpty tokens = @state.suggested

    <div
      className="token-input-list#{if @state.showList then ' active' else ''}"
    >
      <ul>
        {@_renderToken t, k for t, k in tokens when not @listFilter t}
      </ul>
    </div>

  render: ->
    <div
      className="token-input-container"
      tabIndex={-1} onFocus={@_showListOnFocus} onBlur={@_hideListOnBlur}
    >
      <input
        type="text" placeholder={do @placeholder}
        onChange={@_getTokens} value={@state.current}
      />
      {do @_renderTokensList}
    </div>

module.exports = TokenInput
