import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  title: {
    type: t.String,
    required: true
  },
  description: {
    type: t.String,
    required: true
  },
  slug: {
    full: {
      type: t.String,
      required: true,
      unique: true
    },
    short: {
      type: t.String,
      required: true,
      unique: true
    }
  },
  publisher: {
    ref: "User",
    type: t.ObjectId,
    required: true
  },
  translation: {
    flag: {
      type: t.Boolean,
      default: false
    },
    author: {
      name: t.String, // author's nickname
      profile: t.String // link to an author profile or site
    },
    original: {
      name: t.String,
      link: t.String, // link to original story
    }
  },
  collaborators: [{
    user: {
      ref: "User",
      type: t.ObjectId,
      required: true
    },
    role: {
      type: t.Number,
      required: true
    }
  }],
  isFinished: {
    type: t.Boolean,
    default: false
  },
  isDraft: {
    type: t.Boolean,
    default: false
  },
  dates: {
    createdAt: {
      type: t.Date,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      default: null
    }
  },
  chapters: {
    list: [{
      ref: "Chapter",
      type: t.ObjectId,
      required: true
    }],
    count: {
      type: t.Number,
      default: 0,
      min: 0
    }
  },
  characters: [{
    ref: "Character",
    type: t.ObjectId,
    required: true
  }],
  genres: [{
    ref: "Genre",
    type: t.ObjectId,
    required: true
  }],
  score: {
    votes: [{
      user: {
        ref: "User",
        type: t.ObjectId,
        required: true
      },
      vote: {
        type: t.Number,
        require: true,
        min: 1,
        max: 5
      }
    }],
    avg: {
      type: t.Number,
      default: 0,
      min: 0
    }
  }
})

export default schema
