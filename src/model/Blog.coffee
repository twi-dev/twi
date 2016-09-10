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
# Get posts by tag name
#
# @param string name
# @param int page
#
# @return array
###
getByTagByName = (name, page) ->
  postsData = await Promise.resolve post.findAll
    raw: on
    attributes:
      exclude: ["userId", "content"]
    include: [{
      model: tag
      attributes: []
      where: {name: decodeURI name}
    }, {
      model: user
      attributes: ["login"]
    }]

  unless postsData?
    throw new NotFoundException "There is no post with given tag \"#{name}\"."

  for __post in postsData
    {postId} = __post
    postTagsData = await Promise.resolve post.findAll
      raw: on
      include: [
        model: tag
        attributes: [
          "name"
        ]
      ]
      attributes: []
      where: {postId}

    __post.tags = (tag["tags.name"] for tag in postTagsData)

  return postsData

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

###
# Get one post by slug
#
# @param string slug
#
# @return object
###
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

  # TODO: Don't forget to fix following issue:
  # TypeError: self.$expandAttributes is not a function
  return postData

module.exports = {
  getByTagByName
  createPost
  getPost
}
