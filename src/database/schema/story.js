const getModelFields = ({TObjectId, TString, TNumber, TBoolean}) => ({
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
    required: true,
    unique: true
  },
  author: {
    ref: "User",
    type: TObjectId,
    required: true
  },
  coAuthors: [{
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
  isTranslation: {
    type: TBoolean,
    default: false
  },
  isCompleted: {
    type: TBoolean,
    default: false
  },
  chapters: [{
    ref: "Chapter",
    type: TObjectId,
    required: true
  }],
  chaptersCount: {
    type: TNumber,
    default: 0
  },
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
