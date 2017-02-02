register = require "ignore-styles"

ignoreRequire = (handler) -> register.default undefined, handler

module.exports = ignoreRequire
