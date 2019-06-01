import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  name: {
    type: t.String,
    required: true
  },
  code: {
    type: t.String,
    required: true,
    unique: true
  },
  pic: {
    type: t.String,
    required: true
  }
})

export default schema
