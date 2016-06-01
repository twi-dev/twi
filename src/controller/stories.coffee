###
# Response stories
# 
# GET /stories/:page?
###
actionIndex = (req, res) ->
  res.render 'stories/index',
    title: 'Фанфики'

###
# Read story with given id
# 
# GET /story/read/:storyId/:chapter?
###
actionRead = (req, res) ->
  res.render 'stories/read',
    title: 'Название фанфика'

###
# Response Add Story page
# 
# GET /story/new
###
actionNew = (req, res) ->
  res.render 'stories/new'

###
# Add new story
#
# POST /story/new
###
actionSend = (req, res) ->

###
# Response Edit Story page
#
# GET /story/edit/:storyId
###
actionEdit = (req, res) ->
  res.render 'stories/edit',
    title: 'Редактирование'

###
# Save changes for story with given id
# 
# PUT /story/edit/:storyId
###
actionSave = (req, res) ->
  yield next

###
# DELETE 
###
actionDelete = (req, res) ->

module.exports = (app) ->
  # List of all stories
  app.get '/stories/:page?', actionIndex

  # Read story with given id
  app.get '/story/read/:storyId/:chapter?', actionRead

  # Add new story
  app.route '/story/new', actionNew
    .get actionNew
    .post actionSend

  # Edit story
  app.route '/story/edit/:storyId/:chapter?'
    .get actionEdit
    .put actionSave

  # Delete story
  app.delete '/story/:storyId', actionDelete

  return
