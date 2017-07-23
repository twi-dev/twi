const getModelFields = ({TString}) => ({
  name: {
    type: TString,
    required: true
  },
  pic: {
    type: TString,
    required: true
  }
})

export default getModelFields
