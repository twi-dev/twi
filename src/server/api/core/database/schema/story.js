const getModelFields = ({TObjectId, TString, TNumber}) => ({
  title: {
    type: TString,
    required: true
  },
  description: {
    type: TString,
    required: true
  },
  slug: {
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
      type: TObjectId,
      required: true
    },
    role: {
      type: TNumber,
      required: true
    }
  }],
  chapters: [{
    ref: "Chapter",
    type: TObjectId,
    required: true
  }],
  characters: [{
    ref: "Character",
    type: TObjectId,
    required: true
  }],
  genres: [{
    ref: "Genre",
    type: TObjectId,
    required: true
  }],
  ratings: [{
    user: {
      ref: "User",
      type: TObjectId,
      required: true
    },
    value: {
      type: TNumber,
      require: true,
      min: 1,
      max: 5
    }
  }],
  ratingAvg: {
    type: TNumber,
    default: 0,
    min: 0
  }
})

export default getModelFields
