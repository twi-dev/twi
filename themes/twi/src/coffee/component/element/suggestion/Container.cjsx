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

  ###
  # Change selected item in list
  ###
  _changeSelection: ->

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
    newState.push {id, name}

    @setState
      showList: no
      current: ""
      actve: 0
      selected: newState
      suggestions: []

  _renderSuggestionMark: (suggestion) ->
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

  _renderSuggestionsList: ->
    return if isEmpty @state.suggestions

    for suggestion, index in @state.suggestions
      <li
        id={"selected-suggestion" if index is @state.active}
        key={suggestion.id}
        data-id={suggestion.id}
        onClick={@chooseByClick}
      >
        {@_renderSuggestionMark suggestion}
        <div className="input-suggestions-list-label fl">
          {suggestion["locale.name"]}
        </div>
      </li>

  _renderTagList: (tags) ->
    for suggestion, index in @state.selected
      <div
        key={suggestion.id}
        data-id={suggestion.id}
        className="suggestion-input-tag fl"
        onClick={@removeByClick}
      >
        {suggestion.name}
      </div>

  _renderTags: ->
    return if isEmpty @state.selected

    <div className="suggestion-input-tags">
      {@_renderTagList @state.selected}
    </div>

  getUrl: -> "" # noop

  ###
  # @return Promise
  ###
  _requestSuggestions: (value) ->
    axios.get "#{do @getUrl}/#{value}?ref=ed" if value? and (do @getUrl)?

  ###
  # Get suggestions from server
  #
  # @params Event e
  ###
  getSuggestions: ({target}) =>
    return unless (do @getUrl)?

    unless target.value
      @setState suggestions: [], showList: no, current: ""
      return

    @setState current: target.value

    axios.get "#{do @getUrl}/#{target.value}?ref=ed"
      .then ({data}) =>
        @setState
          showList: if isEmpty data then no else yes
          suggestions: data
      .catch (err) -> console.error err

  removeByClick: (e) => @_spliceSuggestion e.currentTarget.dataset.id

  chooseByClick: (e) =>
    @_pushSuggestion e.currentTarget.dataset.id, do e.currentTarget.innerText.trim

  chooseByKeyDown: (e) =>
    if e.keyCode in [keys.TAB, keys.ENTER, keys.UP, keys.DOWN] and @state.showList
      do e.preventDefault

      selected = document.querySelector '#selected-suggestion'
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

  closeSuggectionsOnBlur: =>
    # Close list on next tick
    setTimeout (=> @setState showList: no), 0 if @state.showList

  openOnFocus: =>
    @setState showList: on if @state.current and not isEmpty @state.suggestions

  render: ->
    <div className="input-suggestions-container">
      <div className="input-suggestions-field">
        <input
          type="text"
          value={@state.current}
          style={@props.style}
          onChange={@getSuggestions}
          placeholder={@props.label}
        />
      </div>
      <div className="input-suggestions-list-container #{@props.listPosition}#{
          if @state.showList then ' active' else ''
      }">
        <ul className="input-suggestions-list">
          {do @_renderSuggestionsList}
        </ul>
      </div>
    </div>

module.exports = SuggestionContainer
