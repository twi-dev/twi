{Component} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

Dropzone = require "react-dropzone"

{
  container
} = require "common.styl"
{
  main
  cover
  coverLabel
  details
} = require "./editor.styl"

class StoryEditor extends Component
  render: ->
    <div className="#{container}">
      <form>
        <div className="#{main}">
          <Dropzone className="#{cover}">
            <div className="#{coverLabel}">Story cover</div>
          </Dropzone>
          <div className="#{details}">
            <div className="field">
              <input
                type="text"
                placeholder="Story title"
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Characters..."
              />
            </div>
            <div className="field">
              <textarea
                type="text"
                placeholder="Story description..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>

module.exports = StoryEditor
