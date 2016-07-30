'use strict'

blog = require '../model/Blog'

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

actionTag = ->
  {tagName} = @params

  oTag = yield blog.getTagByName tagName

  @render 'blog/tag',
    title: "Поиск по тегу #{oTag?.name}"

  yield return

actionIndex = ->
  @render 'blog/index',
    title: 'Блог'

  yield return

actionNew = ->
  {user} = @req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{@url}"

  @render 'blog/new',
    title: 'Новая запись в блог'

  yield return

actionCreate = -> yield return

actionEdit = ->
  {user} = @req

  unless user? or user?.role < 3
    throw new ForbiddenException "Unauthorized access to #{@url}"

  yield return

actionSave = -> yield return

actionDelete = -> yield return

actionRead = ->
  # oPost = yield blog.getPostById @params.postId
  # @render 'blog/post',
  #   title: oPost.title
  #   post: oPost

  # TODO: Don't forget to add NotImplementedException class
  # for same specific exceptions.
  throw new NotFoundException "Posts is not implemented right now."

  yield return

module.exports = (r) ->
  r '/blog/tag/:tagName'
    .get actionTag

  r '/blog/post/:postId'
    .get actionRead

  r '/blog/new'
    .get actionNew
    .post actionCreate

  r '/blog/edit/:postId'
    .get actionEdit
    .put actionSave

  r '/blog/delete/:postId'
    .delete actionDelete

  r '/blog/:page?'
    .get actionIndex

  return
