"use strict"

{t} = require "../core/i18n"
blog = require "../model/Blog"

ForbiddenException = require "../core/error/Forbidden"
NotFoundException = require "../core/error/NotFound"

actionTag = (ctx) ->
  {tagName, page} = ctx.params
  {ref} = ctx.query

  return ctx.body = await blog.getTagsByName tagName if ref is "ed"

  ctx.body = await blog.getByTagName tagName, page

  await return

actionIndex = (ctx) ->
  ctx.body = message: "Blog will be here (or not :D)"

  await return

actionNew = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  await ctx.render "blog/new",
    title: t "blog.title.new"
    _csrf: ctx.csrf

  await return

actionCreate = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  {title, content, tags} = ctx.request.body

  # post = await blog.createPost user.userId, title, content, tags

  # ctx.body = post
  ctx.body = {title, content, tags}

  await return

actionEdit = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  await return

actionSave = (ctx) -> await return

actionDelete = (ctx) -> await return

actionRead = (ctx) ->
  ctx.body = await blog.getPost ctx.params.slug

  await return

module.exports = (r) ->
  r "/tag/:tagName/:page?"
    .get actionTag

  r "/post/:slug"
    .get actionRead

  r "/new"
    # .get actionNew
    .post actionCreate

  r "/edit/:slug"
    # .get actionEdit
    .put actionSave

  r "/delete/:slug"
    .delete actionDelete

  r "/:page?"
    .get actionIndex

  return
