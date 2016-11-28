{Component, PropTypes} = React = require "react"
{isEmpty} = require "lodash"

fetch = require "helper/wrapper/fetch"
keys = require "helper/util/keysMap"

class TokenInput extends Component
  @propTypes:
    tokens: PropTypes.array.isRequired
    onUpdate: PropTypes.func.isRequired

  constructor: ->
    @state =
      showList: no
      current: ""
      suggested: []

  renderTokensList: ->

  placeholder: -> "Type your token here..."

  endpoint: -> ""

  requestTokens: (current) =>
    endpoint = do @endpoint
    return await fetch "#{endpoint}/#{current}?ref=ed" unless isEmpty endpoint

  ###
  # Get tokens from remote server by current value
  #
  # @param Event
  ###
  _getTokens: ({target: {value}}) =>
    return @setState current: "", suggested: [] if isEmpty value

    onRejected = (err) => console.warn err

    updateSuggested = (suggested) => @setState {current: value, suggested}

    @requestTokens value
      .then updateSuggested, onRejected

  ###
  # Show list of suggested tokens when TokentInput focused
  ###
  _showListOnFocus: => @setState showList: yes unless isEmpty @state.current

  _hideListOnBlur: => @setState showList: no

  render: ->
    <div
      className="token-input-container"
      tabIndex={-1} onFocus={@_showListOnFocus} onBlur={@_hideListOnBlur}
    >
      <input
        type="text" placeholder={do @placeholder}
        onChange={@_getTokens} value={@state.current}
      />
    </div>

module.exports = TokenInput
