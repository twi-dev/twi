'use strict'

md = new MD = require 'markdown-it'
moment = require 'moment'
model = require '../core/database'
post = model 'post', require '../core/database/schemas/post'
tag = model 'tag', require '../core/database/schemas/tag'
postTags = model 'postTags', require '../core/database/schemas/postTags'
user = model 'user', require '../core/database/schemas/user'

NotFoundException = require '../core/errors/NotFound'
ForbiddenException = require '../core/errors/Forbidden'

post.belongsTo user,
  as: 'user'
  foreignKey: 'userId'

# postTags.belongsTo tag

# tag.belongsTo postTags,
#   as: 'postTags'
#   foreignKey: 'tagId'

# postTags.find
#   include: [{
#     model: postTags
#     as: 'postTags'
#   }]
# .then (oData) -> console.log oData
# .catch (err) -> console.log err

# post.belongsToMany tag,
#   as: 'tag'
#   through:
#     model: postTags
#     as: 'postTags'
#     foreignKey: 'tagId'

# tag.belongsToMany post,
#   as: 'post'
#   through:
#     model: postTags
#     as: 'postTags'
#     foreignKey: 'postId'

# post.find
#   attributes:
#     exclude: [
#       'userId'
#     ]
#   where:
#     userId: 1
#   include: [
#     # model: user
#     # as: 'user'
#     # attributes: [
#     #   'login'
#     # ]
#     all: yes
#   ]
# .then (oData) ->
#   console.log oData = oData.get plain: yes
# #   tag.findAll()
# # .then (oData) -> console.log oData
# .catch (err) -> console.log err

class Blog
  _getTag: (oOptions) ->
    yield tag.findOne oOptions

  getPostById: (sId) ->
    oPostData = yield post.findOne
      include: [
        model: user
        as: 'user'
        attributes: [
          'login'
        ]
      ]
      where:
        postId: sId

    unless oPostData?
      throw new NotFoundException "Post is not found."

    oPostData = oPostData.get plain: yes
    oPostData.content = md.render oPostData.content

    yield oPostData

  getTagByName: (sName) ->
    oTagData = yield @_getTag
      attributes:
        exclude: [
          'tagId'
        ]
      where:
        name: sName

    unless oTagData?
      throw new NotFoundException "Tag \"#{sName}\" is not found."

    yield oTagData.get plain: yes

module.exports = new Blog
