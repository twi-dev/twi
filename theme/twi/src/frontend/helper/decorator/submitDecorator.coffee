submitDecorator = (target, key, descriptor) ->
  submit = descriptor.value

  descriptor.value = _submit = (event) ->
    do event.preventDefault

    onFulfilled = (res) -> console.log res

    onRejected = (err) -> console.error err

    submit.call this, event
      .then onFulfilled, onRejected

module.exports = submitDecorator
