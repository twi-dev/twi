###
# Call event.preventDefault before submit
###
preventBeforeSubmit = (target, key, descriptor) ->
  submit = descriptor.value

  descriptor.value = _submit = (event, state) ->
    do event.preventDefault; submit state

module.exports = preventBeforeSubmit
