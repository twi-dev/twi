React = require 'react'
LinkedStateMixin = require 'react-addons-linked-state-mixin'
CharacterEditor = require './CharacterEditor'

co = require 'co'
axios = require '../../vendor/axios/dist/axios'

axios = axios.create
  headers:
    'X-Requested-With': 'XmlHttpRequest'

# This is just a first draft :D
class StoryEditor extends React.Component
  send: (e) ->
    do e.preventDefault
    {csrf} = document.querySelector('#story-editor').dataset

    axios.post '/story/new',
      _csrf: csrf
    .then (res) -> console.log res
    .catch (err) -> console.log err

  render: ->
    # <div>
    <form action="/story/new" method="post" onSubmit={@send}>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="storyTitle"
          placeholder="Название"
        />
      </div>
      <div className="story-editor-field-container">
        <CharacterEditor />
      </div>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="storyCharacters"
          placeholder="Метки"
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
        <button onSubmit={@send}>Отправить</button>
      </div>
    </form>
    # </div>

module.exports = StoryEditor
