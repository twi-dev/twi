{assign, isEmpty} = require 'lodash'
{Component, PropTypes} = React = require 'react'
InputField = require '../element/InputField'
TextareaField = require '../element/TextareaField'

IconPencil = require '../../../../public/img/layout/pencil.svg'
IconDocument = require '../../../../public/img/layout/document.svg'

chapterTemplate =
  type: 'text'
  title: ''
  content: ''

class ChapterConstructor extends Component
  @propTypes:
    chaptersRegister: PropTypes.func.isRequired
    chapters: PropTypes.array.isRequired

  constructor: ->
    @state =
      current: 0
      chapters: []

  addChapterBlock: (e) => @_pushChapter e.currentTarget.dataset.type

  updateCurrentTitle: (e) => console.log e.target.value

  updateChapterState: (e) => console.log e.target.value

  _pushChapter: (type) =>
    newState = @state.chapters[..]
    newState.push assign {}, chapterTemplate, {type}
    @setState chapters: newState

  _spliceChapter: (id) =>

  _renderChapterBlock: ->
    for chapter, index in @state.chapters
      <div
        key={index}
        data-id={index}
        className="chapters-constructor-chapter"
      >
        <InputField
          name="title"
          label="Название главы"
          onChange={@updateCurrentTitle}
        />
        {
          if chapter.type is 'text'
            do @_renderTextField
          else
            do @_renderUploadField
        }
      </div>

  _renderTextField: ->
    <TextareaField
      name="content"
      label="Текст главы"
      onChange={@updateChapterState}
    />

  _renderUploadField: -> <div>document</div>

  render: ->
    <div className="chapters-constructor-container">
      {do @_renderChapterBlock unless isEmpty @state.chapters}
      <div className="chapters-constructor-buttons-wrapper">
        <button
          className="
            button button-violet
            button-floating chapters-constructor-button
          "
          type="button"
          data-type="document"
          onClick={@addChapterBlock}
        ><IconDocument /></button>
        <button
          className="
            button button-violet
            button-floating chapters-constructor-button
          "
          type="button"
          data-type="text"
          onClick={@addChapterBlock}
        ><IconPencil /></button>
      </div>
    </div>

module.exports = ChapterConstructor
