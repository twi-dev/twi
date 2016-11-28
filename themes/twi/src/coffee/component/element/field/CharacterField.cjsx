TokenInput = require "../common/token/TokenInput"

class CharacterField extends TokenInput
  placeholder: -> "Characters: Pinkie Pie, Applejack, Fluttershy"

  endpoint: -> "/story/characters"

module.exports = CharacterField
