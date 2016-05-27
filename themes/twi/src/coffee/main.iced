'use strict'

init = ->

require './nav-menu.js'

if document.querySelector '#auth'
  require './vm/auth'
