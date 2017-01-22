{observable, action} = require "mobx"
{dms, dm} = require "decorator"

class App
  title: "Библиотека Твайлайт"

  width: 0

  height: 0

  setTitle: (title) => @title = title

module.exports = dms App, [
  dm observable, "title"
  dm observable, "width"
  dm observable, "height"
  dm action, "setTitle"
]
