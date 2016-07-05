isXhr = (next) ->
  @isXhr = @request.get('x-requested-with').toLowerCase() is 'xmlhttprequest'

  yield next

module.exports = isXhr
