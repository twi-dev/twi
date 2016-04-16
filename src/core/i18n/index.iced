'use strict'

fs = require 'fs'
i18next = require 'i18next'
yaml = require 'node-yaml'

requireHelper = require '../helpers/require-helper'
{getConfig} = require '../components'
{app: {lang}} = do getConfig

i18n = null
sCurrentLang = lang

getLang = -> sCurrentLang

setLang = (sLang) ->
  sCurrentLang = sLang
  return

loadLangs = ->
  __oLangs = requireHelper '../../langs'
  __aLangs = Object.keys __oLangs
  __ref = {}
  for __sLangName in __aLangs
    __ref[__sLangName] = {}
    __ref[__sLangName]['translation'] = __oLangs[__sLangName]

  return __ref

init = -> i18next.init resources: do loadLangs

t = (sKey, oOptions = {}) ->
  oOptions.lng or= lang

  unless i18n?
    i18n = do init

  return i18n.t sKey, oOptions

module.exports =
  init: init
  t: t
  getLang: getLang
