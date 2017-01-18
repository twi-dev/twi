React = {PropTypes: {instanceOf, func, string}} = require "react"
Dropzone = require "react-dropzone"
{observer} = require "mobx-react"

{container, label, preview} = require "./cover.styl"

renderPreview = (cover) ->
  <div className="#{preview}">
    <img src="#{cover.preview}" alt="Story cover – #{cover.name}" />
  </div>

renderLabel = -> <div className="#{label}">Story cover</div>

CoverEditor = ({cover, onDrop}) ->
  <Dropzone multiple={off} className="#{container}" onDrop={onDrop}>
    {if cover then renderPreview cover else do renderLabel}
  </Dropzone>

CoverEditor.propTypes =
  cover: instanceOf File
  onDrop: func
  children: string

module.exports = observer CoverEditor
