SuggestionContainer = require "./Container"

###
# Tag field with suggestions
###
class TagSuggestion extends SuggestionContainer
  getUrl: -> "/blog/tag"

module.exports = TagSuggestion
