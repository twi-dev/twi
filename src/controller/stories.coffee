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
actionIndex = ->
  @render 'stories/index',
    title: t 'stories.title.index'

  yield return

###
# GET
###
actionStory = ->
  @render 'stories/story',
    title: 'Страница рассказа'

  yield return

###
# Read story with given id
# 
# GET /story/read/:slug/:chapter?
###
actionRead = ->
  @render 'stories/read',
    title: 'Story title'

  yield return

###
# Response Add Story page
# 
# GET /story/new
###
actionNew = ->
  unless do @req.isAuthenticated
    throw new ForbiddenException "
      Unauthorized access to \"Add new story\" page.
    "

  @render 'stories/new',
    title: t 'stories.title.new'
    _csrf: @csrf

  yield return

###
# Add new story
#
# POST /story/new
###
actionCreateStory = ->
  unless do @req.isAuthenticated
    throw new ForbiddenException "
      Unauthorized access to \"Add new story\" page.
    "

  {
    title, characters
    marks, synopsis
    description, chapters
    isItDraft, chapters
  } = @request.body

  if @isXhr
    @body = {
      title, characters
      marks, synopsis
      description, chapters
      isItDraft, chapters
    }

  yield return

###
# Response Edit Story page
#
# GET /story/edit/:slug
###
actionEdit = ->
  @render 'stories/edit',
    title: t 'stories.title.edit'

  yield return

###
# Save changes for story with given id
# 
# PUT /story/edit/:slug
###
actionSave = ->
  yield return

###
# DELETE /story/:slug
###
actionDelete = ->
  yield return

actionCharacters = ->
  {name} = @params

  unless @isXhr
    throw new NotAllowedException "
      Method not allowed for non-xhr requests on route #{@url}
    "

  @body = if name?
    yield story.getCharactersByName name
  else
    yield do story.getCharacters

  yield return

actionMarks = ->
  {name} = @params

  unless @isXhr
    throw new NotAllowedException "
      Method not allowed for non-xhr requests on route #{@url}
    "

  @body = if name?
    yield story.getMarkByName name
  else
    yield do story.getMarks

  yield return

main =  (r) ->
  # Get characters
  r '/story/characters/:name?'
    .get actionCharacters

  # Get marks
  r '/story/marks/:name?'
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
