DevServer = require "webpack-dev-server"

server = (compiler, opts = {}) -> new DevServer compiler, opts

module.exports = server
