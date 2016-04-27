'use strict'

# Vue = require '../vendor/vue/dist/vue'
# resource = require '../vendor/vue-resource/dist/vue-resource'
# validate = require '../vendor/validate/validate'

# Vue.use resource

# oValidators =
#   username:
#     presence: yes
#     format:
#       pattern: /^[a-z0-9-_]+$/i
#       message: "is not valid"
#   email:
#     presence: yes
#     email: yes
#   password:
#     presence: yes
#     length:
#       minimum: 6

# oConfirmPass =
#   password:
#     presence: yes
#   confirm:
#     equality: 'password'

# verify = (sLogin = '', sEmail = '', sPass = '', sRepass = '') ->

#   if sRepass
#     if validate password: sPass, confirm: sRepass, oConfirmPass
#       return false

#   __ref = validate
#     username: sLogin
#     email: sEmail,
#     password: sPass
#     oValidators

#   # console.log __ref

#   if __ref
#     return false

#   return true

# authSuccess = (oResponsed) ->
#   console.log oResponsed.data

# authFailed = (oResponsed) ->
#   console.log oResponsed

# submit = (e) ->
#   do e.preventDefault
#   sAct = @$el.action

#   [sLogin, sEmail, sPass, sRepass] = [
#     do @username.trim
#     do @email.trim
#     do @pass.trim
#     do @repass.trim
#   ]

#   unless verify sLogin, sEmail, sPass, sRepass
#     console.log 'foo'
#     return

  # @$http.post sAct, {
  #   username: sLogin
  #   email: sEmail
  #   pass: sPass
  # }, {
  #   emulateJSON: yes
  # }
  # .then authSuccess, authFailed


# auth = new Vue
#   el: '#auth'
#   data:
#     username: ''
#     email: ''
#     pass: ''
#     repass: ''
#   methods:
#     submit: submit