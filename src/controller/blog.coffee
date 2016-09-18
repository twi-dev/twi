"use strict"

{t} = require "../core/i18n"
blog = require "../model/Blog"

ForbiddenException = require "../core/error/Forbidden"
NotFoundException = require "../core/error/NotFound"

actionTag = (ctx) ->
  {tagName} = ctx.params
  {ref} = ctx.query

  return ctx.body = {tagName} if ref is "ed"

  data = await blog.getByTagByName tagName

  ctx.render "blog/tag",
    title: "Поиск по тегу #{tagName}"
    post: data

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
  {title} = post = await blog.getPost ctx.params.slug

  ctx.render 'blog/post', {title, post}

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
