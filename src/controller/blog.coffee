'use strict'

blog = require '../model/Blog'

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

actionTag = (next) ->
  {tagName} = @params

  oTag = yield blog.getTagByName tagName

  @render 'blog/tag',
    title: "Поиск по тегу #{oTag?.name}"

  yield next

actionIndex = (next) ->
  @render 'blog/index',
    title: 'Блог'

  yield next

actionNew = (next) ->
  {user} = @req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{@url}"

  @render 'blog/new',
    title: 'Новая запись в блог'

  yield next

actionCreate = (next) ->
  yield next

actionEdit = (next) ->
  {user} = @req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{@url}"

  yield next

actionSave = (next) ->
  yield next

actionDelete = (next) ->
  yield next

actionRead = (next) ->
  # oPost = yield blog.getPostById @params.postId
  # @render 'blog/post',
  #   title: oPost.title
  #   post: oPost

  # TODO: Don't forget to add NotImplementedException class
  # for same specific exceptions.
  throw new NotFoundException "Posts is not implemented right now."

  yield next

module.exports = (route) ->
  route '/blog/tag/:tagName'
    .get actionTag

  route '/blog/post/:postId'
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
