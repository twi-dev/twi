'use strict'

isEmail = (sValue = '') ->
  ///
    ^[-a-z0-9~!$%^&*_=+}{\'?]+
    (\.[-a-z0-9~!$%^&*_=+}{\'?]+)*
    @([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*
    \.(aero|arpa|biz|com|coop|edu|gov|info|
    int|mil|museum|name|net|org|pro|travel|
    mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}
    \.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$
  ///i.test sValue

isValidLogin = (sValue = '') -> /^[a-z0-9_\.]+$/i.test sValue

isValidPassword = (sValue = '') -> /^.{8,}$/i.test sValue

module.exports =
  isEmail: isEmail
  isValidLogin: isValidLogin
  isValidPassword: isValidPassword
