{Component} = React = require "react"
{inject, observer} = require "mobx-react"
{dms, dm} = require "decorator"

Dropzone = require "react-dropzone"

CharacterEditor = require "./CharacterEditor"
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
  _updateCover: (files) =>
    [cover] = files
    console.log cover

  render: ->
    <div className="#{container}">
      <form>
        <div className="#{main}">
          <Dropzone className="#{cover}" onDrop={@_updateCover}>
            <div className="#{coverLabel}">Story cover sdf</div>
          </Dropzone>
          <div className="#{details}">
            <div className="#{field}">
              <input
                type="text"
                placeholder="Story title"
              />
            </div>
            <div className="#{field}">
              <CharacterEditor />
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
