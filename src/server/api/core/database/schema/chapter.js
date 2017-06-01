const getModelFields = ({TString}) => ({
  title: {
    type: TString,
    required: true
  },
  text: {
    type: TString,
    required: true
  },
  rendered: {
    type: TString,
    required: true
  }
})

export default getModelFields
