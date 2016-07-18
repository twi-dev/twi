{t} = require '../core/i18n'

story = require '../model/Story'

ForbiddenException = require '../core/errors/Forbidden'
NowFoundException = require '../core/errors/NotFound'
NotAllowedException = require '../core/errors/NotAllowed'

###
# Response stories
# 
# GET /stories/:page?
###
actionIndex = (next) ->
  @render 'stories/index',
    title: t 'stories.title.index'

  yield next

###
# GET
###
actionStory = (next) ->
  @render 'stories/story',
    title: 'Страница рассказа'

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
  unless do @req.isAuthenticated
    throw new ForbiddenException "
      Unauthorized access to \"Add new story\" page.
    "

  @render 'stories/new',
    title: t 'stories.title.new'
    _csrf: @csrf

  yield next

###
# Add new story
#
# POST /story/new
###
actionCreateStory = (next) ->
  unless do @req.isAuthenticated
    throw new ForbiddenException "
      Unauthorized access to \"Add new story\" page.
    "

  {title, characters, marks, synopsis, description} = @request.body

  if @isXhr
    @body = {title, characters, marks, synopsis, description}

  yield next

###
# Response Edit Story page
#
# GET /story/edit/:slug
###
actionEdit = (next) ->
  @render 'stories/edit',
    title: t 'stories.title.edit'

  yield next

###
# Save changes for story with given id
# 
# PUT /story/edit/:slug
###
actionSave = (next) ->
  yield next

###
# DELETE /story/:slug
###
actionDelete = (next) ->
  yield next

actionCharacters = (next) ->
  {name} = @params

  unless @isXhr
    throw new NotAllowedException "
      Method not allowed for non-xhr requests on route #{@url}
    "

  @body = if name?
    yield story.getCharactersByName name
  else
    yield do story.getCharacters

  yield next

actionMarks = (next) ->
  {name} = @params

  yield next

main =  (r) ->
  # Get characters
  r '/story/characters/:name?'
    .get actionCharacters

  # Get marks
  r '/story/marks/:title?'
    .get actionMarks

  # List of all stories
  r '/stories/:page?'
    .get actionIndex

  # Read story with given id
  r '/story/read/:slug/:chapter'
    .get actionRead

  # Add new story
  r '/story/new'
    .get actionNew
    .post actionCreateStory

  # Edit story
  r '/story/edit/:slug/:chapter?'
    .get actionEdit
    .put actionSave

  # Story details/delete story
  # TODO: Node said something about EventEmitter memory leak on this.
  # I need some research.
  r '/story/:slug'
    .get actionStory
    .delete actionDelete


module.exports = main
