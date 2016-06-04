'use strict'

model = require '../core/database'
post = model 'post', require '../core/database/schemas/post'
tag = model 'tag', require '../core/database/schemas/tag'
postTags = model 'postTags', require '../core/database/schemas/postTags'

NotFoundException = require '../core/errors/NotFound'
ForbiddenException = require '../core/errors/Forbidden'

class Blog
  _getTag: (oOptions) ->
    yield tag.findOne oOptions

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

module.exports = Blog
