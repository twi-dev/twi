test = require "ava"

{
  isEmail
  isValidLogin
  isValidPassword
} = require "../../../core/helper/validation"

test "Validate an email", (t) ->
  t.is typeof isEmail, "function", "isEmail should be a function"
  t.false (do isEmail), "should return false whel calling without params"
  t.true isEmail("email@example.com"), "should return true for a valid email"
  t.false isEmail("not-email.com"), "should return false on invalid email"

  await return
