{t} = require "../core/i18n"
{decorateFunc} = require "../core/helper/util/decorator"
checkAuth = require "../core/helper/decorator/user/checkAuth"
story = require "../model/Story"

ForbiddenException = require "../core/error/Forbidden"
NowFoundException = require "../core/error/NotFound"
NotAllowedException = require "../core/error/NotAllowed"


###
# Response stories
# 
# GET /stories/:page?
###
actionIndex = (ctx) ->
  ctx.render "stories/index",
    title: t "stories.title.index"

  await return

###
# GET
###
actionStory = (ctx) ->
  ctx.render "stories/story",
    title: "Страница рассказа"

  await return

###
# Read story with given id
# 
# GET /story/read/:slug/:chapter?
###
actionRead = (ctx) ->
  ctx.render "stories/read",
    title: "Story title"

  await return

###
# Response Add Story page
# 
# GET /story/new
###
actionNew = (ctx) ->
  ctx.render "stories/new",
    title: t "stories.title.new"
    _csrf: ctx.csrf

  await return

###
# Add new story
#
# POST /story/new
###
actionCreateStory = (ctx) ->
  unless do ctx.req.isAuthenticated
    throw new ForbiddenException "
      Unauthorized access to \"Add new story\" page.
    "

  {
    title, characters
    marks, synopsis
    description, chapters
    isItDraft, chapters
  } = ctx.request.body

  if ctx.isXhr
    ctx.body = {
      title, characters
      marks, synopsis
      description, chapters
      isItDraft, chapters
    }

  await return

###
# Response Edit Story page
#
# GET /story/edit/:slug
###
actionEdit = (ctx) ->
  ctx.render "stories/edit",
    title: t "stories.title.edit"

  await return

###
# Save changes for story with given id
# 
# PUT /story/edit/:slug
###
actionSave = (ctx) ->
  await return

###
# DELETE /story/:slug
###
actionDelete = (ctx) ->
  await return

actionCharacters = (ctx) ->
  {name} = ctx.params

  unless ctx.isXhr
    throw new NotAllowedException "
      Method not allowed for non-xhr requests on route #{ctx.url}
    "

  ctx.body = if name?
    await story.getMatchedCharactersByName name
  else
    await do story.getCharacters

  await return

actionMarks = (ctx) ->
  {name} = ctx.params

  unless ctx.isXhr
    throw new NotAllowedException "
      Method not allowed for non-xhr requests on route #{ctx.url}
    "

  ctx.body = if name?
    await story.getMarkByName name
  else
    await do story.getMarks

  await return

main =  (r) ->
  # Get characters
  r "/story/characters/:name?"
    .get actionCharacters

  # Get marks
  r "/story/marks/:name?"
    .get actionMarks

  # List of all stories
  r "/stories/:page?"
    .get actionIndex

  # Read story with given id
  r "/story/read/:slug/:chapter"
    .get actionRead

  # Add new story
  r "/story/new"
    .get decorateFunc checkAuth, actionNew
    .post actionCreateStory

  # Edit story
  r "/story/edit/:slug/:chapter?"
    .get actionEdit
    .put actionSave

  # Story details/delete story
  # TODO: Node said something about EventEmitter memory leak on this.
  # I need some research.
  r "/story/:slug"
    .get actionStory
    .delete actionDelete


module.exports = main
