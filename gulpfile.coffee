"use strict"

# Common plugins
gulp = require "gulp"
gutil = require "gulp-util"
watch = require "gulp-watch"
plumber = require "gulp-plumber"
rimraf = require "rimraf"

# SVG
svgmin = require "gulp-svgmin"

{app: {theme}} = require "./core/helper/configure"
theme or= "twi"

# Theme path
THEME_PATH = "#{__dirname}/theme/#{theme}"

# Src dirs

SVG_SRC = "#{THEME_PATH}/src/svg/**/*.svg"

###
# Destination dirs
###
SVG_DEST = "#{__dirname}/public/assets/img"

# Is devel task running?
isDevel = no

###
# Error Handler
# 
# @param Error err
###
errorHandler = (err) ->
  gutil.log String err
  unless isDevel
    process.exit 1

###
# SIGINT signal listener
# 
# Clean frontend/gulp-runtime before exit if devel task has been running
###
process.on "SIGINT", ->
  if isDevel
    rimraf COFFEE_TMP, ->
      process.exit 0
    return
  process.exit 0

process.on "error", errorHandler

###
# Optimizing SVG.
###
gulp.task "svg", ->
  rebuildSvg = ->
    gutil.log "Rebuild svg..."
    gulp.src SVG_SRC
      .pipe plumber errorHandler
      .pipe do svgmin
      .pipe gulp.dest SVG_DEST

  do rebuildSvg
  watch SVG_SRC, rebuildSvg if isDevel

###
# Devel task with gulp-watch
# 
# Run: gulp devel
###
gulp.task "watch", ["svg"]

###
# Build frontend app for probuction
#
# Run: gulp or gulp make
###
gulp.task "make", ["svg"]

###
# Execute task "make"
###
gulp.task "default", ["make"]
