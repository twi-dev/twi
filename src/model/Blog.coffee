"use strict"

{isEmpty} = require "lodash"
md = new MD = require "markdown-it"
moment = require "moment"
limax = require "limax"

{post, tag, postTags, user} = require "../core/server/model"

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

# Associate users with posts
postUser = post.belongsTo user, foreignKey: "user_id"
userPost = user.belongsTo post, foreignKey: "user_id"

###
# Get tag by given name
###
getTagsByName = (name) -> (
  await tag.findAll
    raw: on
    limit: 5
    attributes: ["name"]
    where:
      name:
        $like: "%#{decodeURI name}%"
) or []

###
# Get posts by tag name
#
# @param string name
# @param int page
#
# @return array
###
getByTagName = (name, page = 1) ->
  if "#{(page = Number page)}" is "NaN"
    throw new TypeError "Page value must be a number"

  postsData = await post.findAll
    raw: on
    limit: 10 # 10 records per page
    offset: page * 10 - 9 # ...with offset 10 per page
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
    throw new NotFoundException "There is no posts with given tag \"#{name}\"."

  for __post in postsData
    {postId} = __post
    postTagsData = await post.findAll
      raw: on
      include: [
        model: tag
        attributes: [
          "name"
        ]
      ]
      attributes: []
      where: {postId}

    __post.tags = (__tag["tags.name"] for __tag in postTagsData)

  return postsData

###
# Create a new post
#
# @param string userId
# @param string title
# @param string content
# @param array tags
###
createPost = (userId, title, content, tags) ->
  if isEmpty tags
    throw new Error "Tags cannot be empty"

  renderedContent = md.render content
  {postId, slug} = await Promise.resolve post.create {
    userId, title
    content, renderedContent
    tags, slug: "#{limax title}.#{do moment}"
  }, raw: on

  tagsData = await for name in tags
    await tag.findOrCreate
      raw: on
      where: {name}
      defaults: {name}

  for tag in tagsData
    {tagId} = tag[0]
    await postTags.findOrCreate
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
  postData = await post.findOne
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
      It's seems like there is no post with given slug: \"#{slug}\".
    "

  postTagsData = (await post.findAll
    raw: on
    include: [
      model: tag
      attributes: ["name"]
    ]
    attributes: []
    where: {slug}) ? []

  postData.tags = (__tag["tags.name"] for __tag in postTagsData) ? []

  return postData

module.exports = {
  getTagsByName
  getByTagName
  createPost
  getPost
}
