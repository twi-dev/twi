"use strict"

_ = require "lodash"
moment = require "moment"
{app: {lang}} = require "../core/helper/configure"

model = require "../core/database"
story = model "story", require "../core/database/schemas/stories"
character = model "character", require "../core/database/schemas/character"
characterLocale = model "characterLocale",
  require "../core/database/schemas/characterLocale"
mark = model "mark", require "../core/database/schemas/mark"
markLocale = model "markLocale", require "../core/database/schemas/markLocale"

character.hasMany characterLocale,
  as: "locale"
  foreignKey: "character_id"

mark.hasMany markLocale,
  as: "locale"
  foreignKey: "mark_id"

class Story
  getCharacters: ->
    await Promise.resolve character.findAll
      raw: yes
      attributes: [
        ["character_id", "id"]
        "pic"
      ]
      include: [
        as: "locale"
        model: characterLocale
        attributes: [
          "name"
        ]
      ]

  getCharactersByName: (name) ->
    await Promise.resolve character.findAll
      raw: yes
      attributes: [
        ["character_id", "id"]
        "pic"
      ]
      include: [
        as: "locale"
        model: characterLocale
        attributes: [
          "name"
        ]
        where:
          name:
            $like: "%#{decodeURI name}%"
      ]

  getMarks: ->
    await Promise.resolve mark.findAll
      raw: yes
      attributes: [
        ["mark_id", "id"]
        "color"
      ]
      include: [
        as: "locale"
        model: markLocale
        attributes: [
          "name"
        ]
      ]

  getMarkByName: (name) ->
    await Promise.resolve mark.findAll
      raw: yes
      attributes: [
        ["mark_id", "id"]
        "color"
      ]
      include: [
        as: "locale"
        model: markLocale
        attributes: [
          "name"
        ]
        where:
          name:
            $like: "%#{decodeURI name}%"
      ]

module.exports = new Story
