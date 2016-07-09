'use strict'

_ = require 'lodash'
moment = require 'moment'

model = require '../core/database'
story = model 'story', require '../core/database/schemas/stories'
character = model 'character', require '../core/database/schemas/character'

class Story
  getCharacters: -> yield character.findAll raw: yes

  getCharactersById: (id) ->
    yield character.findOne
      where:
        characterId: id
      raw: yes

module.exports = new Story
