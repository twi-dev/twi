import now from "core/helper/util/now"

const story = ({TObjectId, TString, TNumber, TBoolean, TDate}) => ({
  title: {
    type: TString,
    required: true
  },
  description: {
    type: TString,
    required: true
  },
  slug: {
    full: {
      type: TString,
      required: true,
      unique: true
    },
    short: {
      type: TString,
      required: true,
      unique: true
    }
  },
  publisher: {
    ref: "User",
    type: TObjectId,
    required: true
  },
  translation: {
    flag: {
      type: TBoolean,
      default: false
    },
    author: {
      name: TString, // author's nickname
      profile: TString // link to an author profile or site
    },
    original: TString // link to original story
  },
  collaborators: [{
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
  isFinished: {
    type: TBoolean,
    default: false
  },
  dates: {
    createdAt: {
      type: TDate,
      default: now
    },
    updatedAt: {
      type: TDate,
      default: null
    }
  },
  chapters: {
    list: [{
      ref: "Chapter",
      type: TObjectId,
      required: true
    }],
    count: {
      type: TNumber,
      default: 0,
      min: 0
    }
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
  score: {
    votes: [{
      user: {
        ref: "User",
        type: TObjectId,
        required: true
      },
      vote: {
        type: TNumber,
        require: true,
        min: 1,
        max: 5
      }
    }],
    avg: {
      type: TNumber,
      default: 0,
      min: 0
    }
  }
})

export default story
