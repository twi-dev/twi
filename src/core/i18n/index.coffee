"use strict"

i18next = require "i18next"
yaml = require "node-yaml"
junk = require "junk"
{readdirSync, realpathSync} = require "fs"

{warn} = require "../logger"
requireHelper = require "../helper/require"
{app: {lang}} = require "../helper/configure"

i18n = null
currentLang = lang

LANGS_ROOT = realpathSync "#{__dirname}/../../langs"

getLang = -> currentLang

setLang = (sLang) ->
  currentLang = sLang
  return

loadLangs = ->
  __ref = {}
  langs = readdirSync LANGS_ROOT

  for __lang in langs when junk.not __lang
    try
      phrases = requireHelper "#{LANGS_ROOT}/#{__lang}/backend"
    catch err
      throw err unless err.code is "ENOENT"

      warn "Directory of lang \"#{__lang}\" is empty"
      continue

    __ref[__lang] = {}
    __ref[__lang].translation = phrases

  return __ref

init = -> i18next.init resources: do loadLangs

t = (key, options = {}) ->
  options.lng or= lang

  unless i18n?
    i18n = do init

  return i18n.t key, options

module.exports =
  init: init
  t: t
  getLang: getLang
