{Component} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

Dropzone = require "react-dropzone"
TokenEditor = require "component/common/token/TokenEditor"

ChapterEditor = require "./ChapterEditor"

{
  container
} = require "common.styl"
{
  main
  cover
  coverLabel
  details
  field
} = require "./editor.styl"

class StoryEditor extends Component
  _updateCover: (files) => [cov] = files

  render: ->
    <div className="#{container}">
      <form>
        <div className="#{main}">
          <Dropzone className="#{cover}" onDrop={@_updateCover}>
            <div className="#{coverLabel}">Story cover</div>
          </Dropzone>
          <div className="#{details}">
            <div className="#{field}">
              <input
                type="text"
                placeholder="Story title"
              />
            </div>
            <div className="#{field}">
              <TokenEditor
                placeholder="Type a character name..."
                selected=[]
              />
            </div>
            <div className="#{field}">
              <input
                type="text"
                placeholder="Marks..."
              />
            </div>
            <div className="#{field}">
              <textarea
                type="text"
                placeholder="Story description..."
              />
            </div>
          </div>
        </div>
        <ChapterEditor />
      </form>
    </div>

module.exports = StoryEditor
