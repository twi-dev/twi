const character = ({TString}) => ({
  name: {
    type: TString,
    required: true
  },
  code: {
    type: TString,
    required: true,
    unique: true
  },
  pic: {
    type: TString,
    required: true
  }
})

export default character
