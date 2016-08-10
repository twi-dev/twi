'use strict'

md = new (require 'markdown-it')
moment = require 'moment'
model = require '../core/database'
post = model 'post', require '../core/database/schemas/post'
tag = model 'tag', require '../core/database/schemas/tag'
postTags = model 'postTags', require '../core/database/schemas/postTags'
user = model 'user', require '../core/database/schemas/user'

NotFoundException = require '../core/errors/NotFound'
ForbiddenException = require '../core/errors/Forbidden'

###
# Get tag his name
#
# @param string sName
###
getTagByName = (sName) ->
  oTagData = await Promise.resolve tag.findOne
    attributes:
      exclude: [
        'tagId'
      ]
    where:
      name: decodeURI sName # I'm not sure is that secure

  unless oTagData?
    throw new NotFoundException "Tag \"#{sName}\" is not found."

  await oTagData.get plain: yes

# module.exports = new Blog
module.exports = {
  getTagByName
}
