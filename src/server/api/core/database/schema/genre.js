const getModelFields = ({TString}) => ({
  name: {
    type: TString,
    required: true
  },
  color: {
    type: TString,
    required: true,
    validate: {
      validator: val => /^(#|0x)([0-9a-f]{6}|[0-9a-f]{3})$/i.test(val),
      message: "Wrong color format for value: {VALUE}"
    }
  }
})

export default getModelFields
