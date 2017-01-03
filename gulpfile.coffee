"use strict"

# Common plugins
gulp = require "gulp"
gutil = require "gulp-util"
watch = require "gulp-watch"
plumber = require "gulp-plumber"
rimraf = require "rimraf"

# Css
stylus = require "gulp-stylus"
poststylus = require "poststylus"
csso = require "gulp-csso"
rupture = require "rupture"
jeet = require "jeet"

# SVG
svgmin = require "gulp-svgmin"

{app: {theme}} = require "./core/helper/configure"
theme or= "twi"

# Theme path
THEME_PATH = "#{__dirname}/theme/#{theme}"

# Src dirs
SVG_SRC = "#{THEME_PATH}/src/svg/**/*.svg"
STYLUS_SRC_DIR = "#{THEME_PATH}/src/stylus"
STYLUS_SRC = [
  "#{STYLUS_SRC_DIR}/error/*.styl"
]

###
# Destination dirs
###
SVG_DEST = "#{__dirname}/public/assets/img"
STYLUS_DEST = "#{__dirname}/public/assets/css"

# Is dev task running?
isDev = no

###
# Error Handler
# 
# @param Error err
###
errorHandler = (err) ->
  gutil.log String err
  unless isDev
    process.exit 1

###
# SIGINT signal listener
# 
# Clean frontend/gulp-runtime before exit if dev task has been running
###
process.on "SIGINT", ->
  if isDev
    rimraf COFFEE_TMP, ->
      process.exit 0
    return
  process.exit 0

process.on "error", errorHandler

###
# Set "isDev" as true
###
gulp.task "env:dev", -> isDev = yes

###
# Compile extra stylesheets (non part of frontend app)
###
gulp.task "stylus", ->
  gulp.src STYLUS_SRC
    .pipe plumber errorHandler
    .pipe stylus
      "include css": yes
      use: [
        do rupture
        do jeet
        poststylus [
          "autoprefixer"
        ]
      ]
    .pipe if isDev then do gutil.noop else do csso
    .pipe gulp.dest STYLUS_DEST

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
  watch SVG_SRC, rebuildSvg if isDev

###
# Dev task with gulp-watch
# 
# Run: gulp dev
###
gulp.task "watch", ["env:dev", "svg"]

###
# Build frontend app for probuction
#
# Run: gulp or gulp make
###
gulp.task "make", ["svg", "stylus"]

###
# Execute task "make"
###
gulp.task "default", ["make"]
