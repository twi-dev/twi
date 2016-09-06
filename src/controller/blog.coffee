"use strict"

{t} = require "../core/i18n"
blog = require "../model/Blog"
md = new MD = require "markdown-it"

ForbiddenException = require "../core/error/Forbidden"
NotFoundException = require "../core/error/NotFound"

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
    _csrf: ctx.csrf

  await return

actionCreate = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  {title, content, tags} = ctx.request.body

  post = await blog.createPost user.userId, title, content, tags

  ctx.body = post

  await return

actionEdit = (ctx) ->
  {user} = ctx.req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  await return

actionSave = (ctx) -> await return

actionDelete = (ctx) -> await return

actionRead = (ctx) ->
  # TODO: Don't forget to add NotImplementedException class
  # for same specific exceptions.
  # throw new NotFoundException "Posts is not implemented right now."

  ctx.body = await blog.getPost ctx.params.slug

  await return

module.exports = (r) ->
  r "/blog/tag/:tagName"
    .get actionTag

  r "/blog/post/:slug"
    .get actionRead

  r "/blog/new"
    .get actionNew
    .post actionCreate

  r "/blog/edit/:slug"
    .get actionEdit
    .put actionSave

  r "/blog/delete/:slug"
    .delete actionDelete

  r "/blog/:page?"
    .get actionIndex

  return
