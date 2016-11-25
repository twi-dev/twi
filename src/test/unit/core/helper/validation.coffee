test = require "ava"

{
  isEmail
  isValidLogin
} = require "../../../../core/helper/validation"

test "Email validation", (t) ->
  t.is typeof isEmail, "function", "isEmail should be a function"
  t.false (do isEmail), "should return false when calling without params"
  t.true isEmail("email@example.com"), "should return true for a valid email"
  t.false isEmail("not-email.com"), "should return false on invalid email"

  await return

test "Login validation", (t) ->
  t.is typeof isValidLogin, "function", "isValidLogin should be a function"
  t.false (do isValidLogin), "should return false when calling without params"
  t.true isValidLogin("PurpleSmart"), "should return true for a valid login"
  t.false isValidLogin("Purple Smart"), "should return false on invalid login"

  await return
