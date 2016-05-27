'use strict'

koa = require 'koa'
bodyparser = require 'koa-bodyparser'
sess = require 'koa-generic-session'
redisStorage = require 'koa-redis'

app = do koa
