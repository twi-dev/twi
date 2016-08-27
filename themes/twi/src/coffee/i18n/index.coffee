i18next = require "i18next"
i18n = null

langs = require "twi/langs"

init = -> i18next.init resources: langs
lang = "ru-RU" # Tmp

t = (key, options = {}) ->
  options.lng or= lang

  unless i18n?
    i18n = do init

  return i18n.t key, options

module.exports = t
