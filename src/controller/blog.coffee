'use strict'

blog = new Blog = require '../model/Blog'

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

actionTag = (next) ->
  {tagName} = @params

  oTag = yield blog.getTagByName unescape tagName # I'm not sure is that secure

  @render 'blog/tag',
    title: "Поиск по тегу #{oTag?.name}"

  yield next

actionIndex = (next) ->
  @render 'blog/index',
    title: 'Блог'

  yield next

actionNew = (next) ->
  {user} = this

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{req.url}"

  @render 'blog/new',
    title: 'Новая запись в блог'

  yield next

actionCreate = (next) ->
  yield next

actionEdit = (next) ->
  yield next

actionSave = (next) ->
  yield next

actionDelete = (next) ->
  yield next

actionRead = (next) ->
  yield next

module.exports = (route) ->
  route '/blog/tag/:tagName'
    .get actionTag

  route '/blog/read/:postId'
    .get actionRead

  route '/blog/new'
    .get actionNew
    .post actionCreate

  route '/blog/edit/:postId'
    .get actionEdit
    .put actionSave

  route '/blog/delete/:postId'
    .delete actionDelete

  route '/blog/:page?'
    .get actionIndex

  return
