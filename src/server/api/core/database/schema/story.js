const getModelFields = ({TObjectId, TString, TNumber}) => ({
  title: {
    type: TString,
    required: true
  },
  author: {
    ref: "User",
    type: TObjectId,
    required: true
  },
  coauthors: [{
    user: {
      ref: "User",
      type: TObjectId
    },
    role: {
      type: TNumber,
      required: true
    }
  }],
  chapters: [{
    ref: "StoryChapter",
    type: TObjectId
  }],
  characters: [{
    ref: "StoryCharacter",
    type: TObjectId
  }],
  genres: [{
    ref: "StoryGenre",
    type: TObjectId
  }]
})

export default getModelFields
