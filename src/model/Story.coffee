"use strict"

_ = require "lodash"
moment = require "moment"
{app: {lang}} = require "../core/helper/configure"

{
  story, character, characterLocale, mark, markLocale
} = require "../core/app/model"

character.hasMany characterLocale,
  as: "locale"
  foreignKey: "character_id"

mark.hasMany markLocale,
  as: "locale"
  foreignKey: "mark_id"

getMatchedCharactersByName = (name) ->
  charactersData = await character.findAll
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

  charactersData = for ch in charactersData
    ch = ch.get plain: yes
    [{name}] = ch.locale
    ch.name = name
    delete ch.locale
    ch

  return charactersData

getMarkByName = (name) ->
  marksData = await mark.findAll
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

  marksData = for m in marksData
    m = m.get plain: yes
    [{name}] = m.locale
    m.name = name
    delete m.locale
    m

  return marksData

module.exports = {
  getMatchedCharactersByName
  getMarkByName
}
