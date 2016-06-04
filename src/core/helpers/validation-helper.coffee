'use strict'

###
# Validation helper class for Twi
###
class ValidationHelper
  ###
  # Validate email
  ###
  isEmail: (sValue = '') ->
    pattern = ///
      ^[-a-z0-9~!$%^&*_=+}{\'?]+
      (\.[-a-z0-9~!$%^&*_=+}{\'?]+)*
      @([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*
      \.(aero|arpa|biz|com|coop|edu|gov|info|
      int|mil|museum|name|net|org|pro|travel|
      mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}
      \.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$
    ///i

    return pattern.test sValue

  ###
  # Validate login
  ###
  isLogin: (sValue = '') -> /^[a-z0-9_\.]+$/i.test sValue

  ###
  # Validate password
  ###
  isValidPassword: (sValue = '') -> /^.{8,}$/i.test sValue

module.exports = new ValidationHelper
