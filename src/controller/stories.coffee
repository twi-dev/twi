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
# GET
###
actionStory = (next) ->
  @body = 'Story summary'

  yield next

###
# Read story with given id
# 
# GET /story/read/:slug/:chapter?
###
actionRead = (next) ->
  @render 'stories/read',
    title: 'Story title'

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
# GET /story/edit/:slug
###
actionEdit = (next) ->
  @render 'stories/edit',
    title: 'Edit story'

  yield next

###
# Save changes for story with given id
# 
# PUT /story/edit/:slug
###
actionSave = (next) ->
  yield next

###
# DELETE 
###
actionDelete = (next) ->
  yield next

main =  (r) ->
  # List of all stories
  r '/stories/:page?'
    .get actionIndex

  # Read story with given id
  r '/story/read/:slug/:chapter?'
    .get actionRead

  # Add new story
  r '/story/new'
    .get actionNew
    .post actionSend

  # Edit story
  r '/story/edit/:slug/:chapter?'
    .get actionEdit
    .put actionSave

  # Story details/Delete story
  # TODO: Node said something about EventEmitter memory leak on this.
  # I need some research.
  r '/story/:slug'
    .get actionStory
    .delete actionDelete

module.exports = main
