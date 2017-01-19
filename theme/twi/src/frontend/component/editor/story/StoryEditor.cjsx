{PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"

isEmpty = require "lodash/isEmpty"

Dropzone = require "react-dropzone"
CharacterEditor = require "component/editor/character/CharacterEditor"
CoverEditor = require "component/editor/cover/CoverEditor"

{
  container
} = require "common.styl"
{
  main
  details
  field
} = require "./story.styl"

StoryEditor = ({story}) ->
  _updateCover = (files) => [story.cover] = files

  _addCharacter = (character) =>
    story.addCharacter character unless isEmpty character

  <div className="#{container}">
    <form>
      <div className="#{main}">
        <CoverEditor
          onDrop={story.updateCover}
          cover={story.cover}
        />
        <div className="#{details}">
          <div className="#{field}">
            <input
              type="text"
              name="title"
              value={story.title}
              onChange={story.updateTextField}
              placeholder="Story title"
            />
          </div>
          <div className="#{field}">
            <CharacterEditor
              placeholder="Type a character name..."
              selected={story.characters}
              onChoosen={_addCharacter}
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
              name="description"
              onChange={story.updateTextField}
              placeholder="Story description..."
            />
          </div>
        </div>
      </div>
    </form>
  </div>

module.exports = observer StoryEditor
