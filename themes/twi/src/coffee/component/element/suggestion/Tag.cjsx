React = require "react"
SuggestionContainer = require "./Container"

###
# Tag field with suggestions
###
class TagSuggestion extends SuggestionContainer
  getUrl: -> "/blog/tag"

  renderListItems: ->
    for suggestion, index in @state.suggestions
      <li
        id={"selected-suggestion" if index is @state.active}
        key={index}
        data-id={suggestion.name}
        onClick={@chooseByClick}
      >
        <div className="input-suggestions-list-label fl">
          {suggestion.name}
        </div>
      </li>

module.exports = TagSuggestion
