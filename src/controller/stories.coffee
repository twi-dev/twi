###
# Response stories
# 
# GET /stories/:page?
###
actionIndex = (next) ->
  @render 'stories/index',
    title: 'Stories'

  yield next

###
# Read story with given id
# 
# GET /story/read/:storyId/:chapter?
###
actionRead = (next) ->
  @render 'stories/read',
    title: '<Story title>'

  yield next

###
# Response Add Story page
# 
# GET /story/new
###
actionNew = (next) ->
  @render 'stories/new',
    title: 'Add story'

  yield next

###
# Add new story
#
# POST /story/new
###
actionSend = (next) ->
  yield next

###
# Response Edit Story page
#
# GET /story/edit/:storyId
###
actionEdit = (next) ->
  @render 'stories/edit',
    title: 'Edit story'

  yield next

###
# Save changes for story with given id
# 
# PUT /story/edit/:storyId
###
actionSave = (next) ->
  yield next

###
# DELETE 
###
actionDelete = (next) ->
  yield next

module.exports = (route) ->
  # List of all stories
  route '/stories/:page?'
    .get actionIndex

  # Read story with given id
  route '/story/read/:storyId/:chapter?'
    .get actionRead

  # Add new story
  route '/story/new'
    .get actionNew
    .post actionSend

  # Edit story
  route '/story/edit/:storyId/:chapter?'
    .get actionEdit
    .put actionSave

  # Delete story
  # TODO: Node said something about EventEmitter memory leak on this.
  # I need some research.
  route '/story/:storyId'
    .delete actionDelete

  return
