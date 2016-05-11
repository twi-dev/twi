actionIndex = (req, res) ->
  res.render 'kb/index',
    title: 'База знаний FiM'

actionCharacter = (req, res) ->

module.exports = (app) ->
  app.get '/kb', actionIndex

  return