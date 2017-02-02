{observable, action, computed} = require "mobx"
{dms, dm} = require "decorator"

windowSize = require "helper/dom/windowSize"

class App
  title: "Библиотека Твайлайт"

  width: 0

  height: 0

  constructor: ->
    do @_updateViewportDimension
    window.addEventListener "resize", @_updateViewportDimension, no

  _updateViewportDimension: =>
    {width, height} = do windowSize
    @width = width
    @height = height

  setTitle: (title) => @title = title

  setFoo: ({target: {name, value}}) => @foo = value

module.exports = dms App, [
  dm observable, "title"
  dm observable, "width"
  dm observable, "height"

  dm action, "_updateViewportDimension"
  dm action, "setTitle"
]
