SuggestionContainer = require "./Container"

###
# Tag field with suggestions
###
class TagSuggestion extends SuggestionContainer
  _getUrl: -> "/blog/tag"

module.exports = TagSuggestion
