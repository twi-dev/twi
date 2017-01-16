{PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"

Dropzone = require "react-dropzone"
CharacterEditor = require "component/editor/character/CharacterEditor"

# ChapterEditor = require "./ChapterEditor"

{
  container
} = require "common.styl"
{
  main
  cover
  coverLabel
  details
  field
} = require "./story.styl"

StoryEditor = ({story}) ->
  _updateCover = (files) =>
    [cov] = files

  _onChoosen = (token) =>

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
            <CharacterEditor
              placeholder="Type a character name..."
              selected={[]}
              onChoosen={_onChoosen}
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
    </form>
  </div>

module.exports = StoryEditor
