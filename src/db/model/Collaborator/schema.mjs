import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = ({roles}) => new Schema({
  userId: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  role: {
    type: t.Number,
    required: true,
    default: roles.writer
  }
})

export default schema
