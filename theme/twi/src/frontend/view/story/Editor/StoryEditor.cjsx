{Component} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

{container} = require "./editor.styl"

class StoryEditor extends Component
  render: ->
    <div className="#{container}">
      Editor will be here...
    </div>

module.exports = StoryEditor
