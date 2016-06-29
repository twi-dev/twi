thunk = require 'thunkify'
bcrypt = require 'bcryptjs'

methods = [
  'genSalt'
  'hash'
  'compare'
]

# Wrapper
wrapMethod = (method) ->
  unless bcrypt[method]
    return
  exports[method] = thunk bcrypt[method]

# Wrap async methods
methods.forEach wrapMethod
