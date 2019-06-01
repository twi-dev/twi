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
  color: {
    type: t.String,
    required: true,
    unique: true,
    validate: {
      validator: val => /^(#|0x)([0-9a-f]{6}|[0-9a-f]{3})$/i.test(val),

      message: "Wrong color format for value: {VALUE}"
    }
  }
})

export default schema
