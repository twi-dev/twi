React = require 'react'
co = require 'co'
axios = require '../../vendor/axios/dist/axios'

# This is just a first draft :D
class StoryEditor extends React.Component
  send: (e) ->
    do e.preventDefault
    console.log 'Sending...'

  render: ->
    <form action="/story/new" method="post">
      <div className="story-editor-field-container">
        <input
          type="text"
          name="storyTitle"
          placeholder="Название"
        />
      </div>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="storyCharacters"
          placeholder="Персонажи"
        />
      </div>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="storyCharacters"
          placeholder="Жанры"
        />
      </div>
      <div className="story-editor-field-container">
        <textarea
          className="story-editor-synopsis"
          name="storyInfo"
          placeholder="Синопсис"
        ></textarea>
      </div>
      <div className="story-editor-field-container">
        <textarea name="storyInfo" placeholder="Описание"></textarea>
      </div>
      <div className="story-editor-field-container">
        <button onClick={@send}>Отправить</button>
      </div>
    </form>

module.exports = StoryEditor
