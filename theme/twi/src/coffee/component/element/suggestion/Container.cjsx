{Component, PropTypes} = React = require "react"
{isEmpty} = require "lodash"
axios = require "helper/axios"
keys = require "helper/keyboard"

###
# SuggestionContainer component
#
# @var object state
#   - boolean showList - Show list of suggestions?
#   - string current - Current suggestion value in input
#   - array selected - Collection of all selected suggestions
#   - array suggestions - Collection of all suggestions
###
class SuggestionContainer extends Component
  @propTypes:
    name: PropTypes.string.isRequired
    label: PropTypes.string.isRequired
    style: PropTypes.object
    selected: PropTypes.array.isRequired
    onChange: PropTypes.func.isRequired
    onClick: PropTypes.func.isRequired
    listStyle: PropTypes.object
    listPosition: PropTypes.string

  @defaultProps:
    listPosition: "bottom"

  constructor: ->
    @state =
      showList: no
      current: ""
      active: 0
      selected: []
      suggestions: []

  getUrl: -> # noop

  ###
  # Remove suggestion with given id
  #
  # @param UUID id
  ###
  _spliceSuggestion: (id) ->
    return unless id

    @props.onClick id

    newState = @state.selected[..]
    for suggestion, index in newState when suggestion.id is id
      newState.splice index, 1
      break

    @setState selected: newState

  ###
  # Add selected suggestion to state
  #
  # @param UUID id
  # @param string name
  ###
  _pushSuggestion: (id, name) ->
    return unless id
    return if id in @props.selected

    @props.onChange id

    newState = @state.selected[..]
    newState.push if name? then {id, name} else id

    @setState
      showList: no
      current: ""
      actve: 0
      selected: newState
      suggestions: []

  ###
  # Get suggestions from remote Twi server
  #
  # @param Event
  ###
  _requestSuggestions: ({target: {value}}) =>
    return unless do @getUrl

    return @setState suggestions: [], showList: no, current: "" unless value

    onFulfilled = ({data}) => @getSuggestions data, value

    # FIXME: tmp err handler, should be fix in future
    onRejected = (err) => console.error err

    if value? and do @getUrl
      axios.get "#{do @getUrl}/#{value}?ref=ed"
        .then onFulfilled, onRejected

  renderSuggestionMark: (suggestion) ->
    if suggestion.pic
      <div className="character-editor-list-pic fl">
        <img
          src={
            if suggestion.pic
              "/images/characters/#{suggestion.pic}"
            else
              "/img/user/no-image.png"
          }
          alt={suggestion['locale.name']}
        />
      </div>

  ###
  # Render suggestions list items
  ###
  renderListItems: ->
    for suggestion, index in @state.suggestions
      <li
        id={"selected-suggestion" if index is @state.active}
        key={suggestion.id}
        data-id={suggestion.id}
        onClick={@chooseByClick}
      >
        {@renderSuggestionMark suggestion}
        <div className="input-suggestions-list-label fl">
          {suggestion["locale.name"]}
        </div>
      </li>

  ###
  # Render suggestions list container
  ###
  renderList: ->
    return if isEmpty @state.suggestions

    <div className="input-suggestions-list-container #{@props.listPosition}#{
        if @state.showList then ' active' else ''
      }"
      style={@props.listStyle}
    >
      <ul className="input-suggestions-list">
        {do @renderListItems}
      </ul>
    </div>

  renderSelectedList: (tags) ->
    for suggestion, index in @state.selected
      <div
        key={suggestion.id}
        data-id={suggestion.id}
        className="suggestion-input-tag fl"
        onClick={@removeByClick}
      >
        {suggestion.name}
      </div>

  renderSuggestions: ->
    return if isEmpty @state.selected

    <div className="suggestion-input-tags">
      {@renderSelectedList @state.selected}
    </div>

  ###
  # Get suggestions responsed from server
  #
  # @params Event e
  ###
  getSuggestions: ({data}, current) => # noop

  removeByClick: (e) => @_spliceSuggestion e.currentTarget.dataset.id

  chooseByClick: ({currentTarget: {dataset, innerText}}) =>
    @_pushSuggestion dataset.id, do innerText.trim

  chooseByKeyDown: (e) =>
    if e.keyCode in [
      keys.TAB, keys.ENTER, keys.UP, keys.DOWN
    ] and @state.showList
      do e.preventDefault

      selected = document.querySelector "#selected-suggestion"
      if e.keyCode in [keys.TAB, keys.ENTER]
        @_pushSuggestion selected.dataset.id, do selected.innerText.trim
        return

      if e.keyCode in [keys.UP, keys.DOWN]
        __nodes = selected.parentNode.childNodes
        for __el, __idx in __nodes when __el is selected
          __next = if e.keyCode is keys.UP
            if __idx <= 0 then __nodes.length - 1 else __idx - 1
          else if e.keyCode is keys.DOWN
            if __idx >= __nodes.length - 1 then 0 else __idx + 1

          @setState active: __next
          break

    if e.keyCode is keys.BACKSPACE and @state.current is ""
      do e.preventDefault
      @_spliceSuggestion @state.selected[@state.selected.length - 1]?.id

  closeListOnBlur: => @setState showList: no

  openListOnFocus: =>
    @setState showList: on if @state.current and not isEmpty @state.suggestions

  render: ->
    <div className="input-suggestions-container">
      <div
        className="input-suggestions-field"
        tabIndex={-1}
        onFocus={@openListOnFocus}
        onBlur={@closeListOnBlur}
      >
        <input
          type="text"
          value={@state.current}
          style={@props.style}
          onChange={@_requestSuggestions}
          onKeyDown={@chooseByKeyDown}
          placeholder={@props.label}
        />
        {do @renderList}
      </div>
    </div>

module.exports = SuggestionContainer
