'use strict'

init = ->

require './nav-menu.js'

if document.querySelector '#auth'
  require './vm/auth'

if document.querySelector '.blog-form-main-container'
  require './vm/blog-editor'
