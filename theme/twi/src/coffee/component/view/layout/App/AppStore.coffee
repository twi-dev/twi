{observable, computed} = require "mobx"
{dms, dm} = require "decorator"

windowSize = require "helper/dom/windowSize"

{width, height} = do windowSize

class AppStore
  width: width
  height: height

module.exports = dms AppStore, [
  dm observable, "width"
  dm observable, "height"
]
