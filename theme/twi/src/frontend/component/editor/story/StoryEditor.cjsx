{PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"

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

  _onChoosen = (token) =>

  _updateTextField = ({target: {name, value}}) =>
    story[name] = value if name and name of story

  <div className="#{container}">
    <form>
      <div className="#{main}">
        <CoverEditor
          onDrop={_updateCover}
          cover={story.cover}
        />
        <div className="#{details}">
          <div className="#{field}">
            <input
              type="text"
              name="title"
              onChange={_updateTextField}
              placeholder="Story title"
            />
          </div>
          <div className="#{field}">
            <CharacterEditor
              placeholder="Type a character name..."
              selected={story.characters}
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
              name="description"
              onChange={_updateTextField}
              placeholder="Story description..."
            />
          </div>
        </div>
      </div>
    </form>
  </div>

module.exports = observer StoryEditor
