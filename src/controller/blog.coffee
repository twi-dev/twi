"use strict"

{t} = require "../core/i18n"
blog = require "../model/Blog"

ForbiddenException = require "../core/errors/Forbidden"
NotFoundException = require "../core/errors/NotFound"

actionTag = (ctx) ->
  {tagName} = ctx.params

  oTag = await blog.getTagByName tagName

  ctx.render "blog/tag",
    title: "Поиск по тегу #{oTag?.name}"

  await return

actionIndex = (ctx) ->
  ctx.render "blog/index",
    title: "Блог"

  await return

actionNew = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  ctx.render "blog/new",
    title: t "blog.title.new"

  await return

actionCreate = (ctx) -> await return

actionEdit = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  await return

actionSave = (ctx) -> await return

actionDelete = (ctx) -> await return

actionRead = (ctx) ->
  # oPost = await blog.getPostById ctx.params.postId
  # ctx.render "blog/post",
  #   title: oPost.title
  #   post: oPost

  # TODO: Don't forget to add NotImplementedException class
  # for same specific exceptions.
  throw new NotFoundException "Posts is not implemented right now."

  await return

module.exports = (r) ->
  r "/blog/tag/:tagName"
    .get actionTag

  r "/blog/post/:postId"
    .get actionRead

  r "/blog/new"
    .get actionNew
    .post actionCreate

  r "/blog/edit/:postId"
    .get actionEdit
    .put actionSave

  r "/blog/delete/:postId"
    .delete actionDelete

  r "/blog/:page?"
    .get actionIndex

  return
