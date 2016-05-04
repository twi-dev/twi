'use strict'

_ = require 'lodash'
moment = require 'moment'

model = require '../core/database'
__oBlogStructure = require '../core/database/structure/blog'
__oTagsStructure = require '../core/database/structure/tags'

blog = model 'blog', __oBlogStructure model.dataTypes
tag = model 'blogTag', __oTagsStructure model.dataTypes

__oBlogStructure = null
__oTagsStructure = null

NotFoundException = require '../core/errors/NotFoundException'
InternalException = require '../core/errors/InternalException'
ForbiddenException = require '../core/errors/ForbiddenException'

tag.hasOne blog,
  foreignKey: 'tagId'
  as: 'tags'

class Blog
  _getTag: (oOptions, cb) ->
    tag.findOne oOptions
      .asCallback cb

  getTagByName: (sName, cb) ->
    await @_getTag
      attributes:
        exclude: [
          'tagId'
        ]
      where:
        name: sName,
      defer err, oData

    return cb err if err?

    unless oData?
      cb new NotFoundException "Tag \"#{sName}\" is not found." 
      return

    cb null, oData.get plain: yes

module.exports = Blog
