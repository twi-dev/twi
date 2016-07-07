_ = require 'lodash'
moment = require 'moment'

model = require '../core/database'
story = require '../core/database/schemas/stories'
character = require '../core/database/schemas/character'

class Story
  getCharacterByName: (name) ->
    characterData = yield character.findOne
      where:
        name: name

module.exports = Story
