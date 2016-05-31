thunk = require 'thunkify'
bcrypt = require 'bcryptjs'

aMethods = [
  'genSalt'
  'hash'
  'compare'
]

# Wrapper
wrapMethod = (sMethod) ->
  unless bcrypt[sMethod]
    return
  exports[sMethod] = thunk bcrypt[sMethod]

# Wrap async methods
aMethods.forEach wrapMethod
