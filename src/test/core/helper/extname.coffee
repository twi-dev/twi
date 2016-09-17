test = require "ava"
extname = require "../../../core/helper/extname"

test "Extname helper", (t) ->
  t.is typeof extname, "function", "Helper should be a function be a function."
  t.is extname("cappuccino.coffee"),
    "coffee", "Should return an extname \"coffee\" without dot."
  t.is (do extname), "",
    "Should return an empty string when no arguments passed."
