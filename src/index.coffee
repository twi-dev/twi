'use strict'

# Requiring server
require './core/server'

process.on 'SIGINT', -> process.exit 0
