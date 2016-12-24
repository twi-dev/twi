submitDecorator = (target, key, descriptor) ->
  submit = descriptor.value

  descriptor.value = _submit = (event) ->
    do event.preventDefault

    onRejected = (err) -> console.error err

    submit.call this, event
      .catch onRejected

module.exports = submitDecorator
