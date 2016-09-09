"use strict"

{isEmpty} = require "lodash"
md = new MD = require "markdown-it"
moment = require "moment"
limax = require "limax"
model = require "../core/database"
post = model "post", require "../core/database/schemas/post"
tag = model "tag", require "../core/database/schemas/tag"
postTags = model "postTags", require "../core/database/schemas/postTags"
user = model "user", require "../core/database/schemas/user"

NotFoundException = require "../core/error/NotFound"
ForbiddenException = require "../core/error/Forbidden"

postAssoc = tag.belongsToMany post,
  foreignKey: "tag_id"
  through:
    model: postTags
    unique: no

tagAssoc = post.belongsToMany tag,
  foreignKey: "post_id"
  through:
    model: postTags
    unique: no

postUser = post.belongsTo user, foreignKey: "user_id"
userPost = user.belongsTo post, foreignKey: "user_id"

###
# Get tag his name
#
# @param string name
###
getTagByName = (name) ->
  tagData = await Promise.resolve tag.findOne
    raw: on
    attributes:
      exclude: [
        "tagId"
      ]
    where:
      name: decodeURI name # I'm not sure is that secure

  unless tagData?
    throw new NotFoundException "Tag \"#{name}\" is not found."

  return tagData

createPost = (userId, title, content, tags) ->
  renderedContent = md.render content

  if isEmpty tags
    throw new Error "Tags cannot be empty"

  {postId, slug} = await Promise.resolve post.create {
    userId, title
    content, renderedContent
    tags, slug: "#{limax title}.#{do moment}"
  }, raw: on

  tagsData = await for name in tags
    await Promise.resolve tag.findOrCreate
      raw: on
      where: {name}
      defaults: {name}

  for tag in tagsData
    {tagId} = tag[0]
    await Promise.resolve postTags.findOrCreate
      raw: on
      where: {postId, tagId}
      defaults: {postId, tagId}

  return slug

getPost = (slug) ->
  postTagsData = await Promise.resolve post.findAll
    raw: on
    include: [
      model: tag
      attributes: [
        "name"
      ]
    ]
    attributes: []
    where: {slug}

  postData = await Promise.resolve post.findOne
    raw: on
    include: [
      model: user
      attributes: ["login"]
    ]
    attributes: [
      "title"
      "renderedContent"
      "createdAt"
      "updatedAt"
    ]
    where: {slug}

  unless postData?
    throw new NotFoundException "
      It's seems like there is no post with given slug: \"#{slug}\". Wrong url?
    "

  postData.tags = (tag["tags.name"] for tag in postTagsData)

  return postData

module.exports = {
  getTagByName
  createPost
  getPost
}
