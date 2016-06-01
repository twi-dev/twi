'use strict'

model = require '../core/database'
blog = model 'blog', require '../core/database/schemas/blog'
tag = model 'blogTag', require '../core/database/schemas/blogTags'

NotFoundException = require '../core/errors/NotFound'
# InternalException = require '../core/errors/Internal'
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
