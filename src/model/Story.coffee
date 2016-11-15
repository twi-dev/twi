"use strict"

_ = require "lodash"
moment = require "moment"
{app: {lang}} = require "../core/helper/configure"

{
  story, character, characterLocale, mark, markLocale
} = require "../core/server/model"

character.hasMany characterLocale,
  as: "locale"
  foreignKey: "character_id"

mark.hasMany markLocale,
  as: "locale"
  foreignKey: "mark_id"

getCharactersByName = (name) ->
  await character.findAll
    raw: yes
    limit: 5
    subQuery: off
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

getMarkByName = (name) ->
  await mark.findAll
    raw: yes
    limit: 5
    subQuery: off
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

module.exports = {
  getCharactersByName
  getMarkByName
}
