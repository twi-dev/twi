'use strict'

blog = new Blog = require '../model/Blog'

ForbiddenException = require '../core/errors/ForbiddenException'
NotFoundException = require '../core/errors/NotFoundException'

actionTag = (req, res, next) ->
  {tagName} = req.params

  await blog.getTagByName tagName,
    defer err, oTag

  return next err if err?

  res.render 'blog/tag',
    title: "Поиск по тегу - #{oTag.name}"

actionIndex = (req, res, next) ->
  res.render 'blog/index',
    title: 'Блог'

actionNew = (req, res, next) ->
  {user} = req

  unless user? or user?.role < 3
    next new ForbiddenException "Unauthorized access to #{req.url}"
    return

  res.render 'blog/new',
    title: 'Новая запись в блог'

actionCreate = (req, res, next) ->

actionEdit = (req, res, next) ->

actionSave = (req, res, next) ->

actionDelete = (req, res, next) ->

actionRead = (req, res, next) ->

module.exports = (app) ->
  app.route '/blog/tag/:tagName'
    .get actionTag

  app.route '/blog/read/:postId'
    .get actionRead

  app.route '/blog/new'
    .get actionNew
    .post actionCreate

  app.route '/blog/edit/:postId'
    .get actionEdit
    .put actionSave

  app.route '/blog/delete/:postId'
    .delete actionDelete

  app.route '/blog/:page?'
    .get actionIndex
