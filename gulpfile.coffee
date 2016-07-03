'use strict'

# Common plugins
gulp = require 'gulp'
gutil = require 'gulp-util'
gulpif = require 'gulp-if'
plumber = require 'gulp-plumber'
clean = require 'gulp-rimraf'
rimraf = require 'rimraf'
newer = require 'gulp-newer'
livereload = require 'gulp-livereload'

# Stylus plugins
stylus = require 'gulp-stylus'
csso = require 'gulp-csso'
autoprefixer = require 'gulp-autoprefixer'

# JS plugins
cjsx = require 'coffee-reactify'
browserify = require 'browserify'
uglify = require 'gulp-uglify'
source = require 'vinyl-source-stream' # For rename js bundle
vinylBuffer = require 'vinyl-buffer' # For gulp-uglify

# YAML transformer
yaml = require 'yamlify'

# SVG
svgmin = require 'gulp-svgmin'

# Grid system
jeet = require 'jeet'

# Breakpoint system
rupture = require 'rupture'

{app: {theme}} = require './core/helpers/configure-helper'
theme or= 'twi'

# Theme path
THEME_PATH = "#{__dirname}/themes/#{theme}"

# Src dirs
JADE_SRC = "#{THEME_PATH}/views/**/*.jade"

COFFEE_SRC_DIR = "#{THEME_PATH}/src/coffee"
COFFEE_SRC = "#{COFFEE_SRC_DIR}/main.coffee"
CJSX_SRC = "#{COFFEE_SRC_DIR}/**/*.cjsx"

SVG_SRC = "#{THEME_PATH}/src/svg/**/*.svg"

STYLUS_SRC_DIR = "#{THEME_PATH}/src/stylus"
STYLUS_SRC = [
  "#{STYLUS_SRC_DIR}/common/common.styl"
  "#{STYLUS_SRC_DIR}/errors/*.styl"
]

###
# Destination dirs
###
COFFEE_TMP = "#{THEME_PATH}/src/gulp-tmp/"
COFFEE_DEST = "#{THEME_PATH}/public/assets/js"
SVG_DEST = "#{THEME_PATH}/public/img"
STYLUS_DEST = "#{THEME_PATH}/public/assets/css"

# Is devel task running?
bIsDevel = no

###
# SIGINT signal listener
# 
# Clean frontend/gulp-runtime before exit if devel task has been running
###
process.on 'SIGINT', ->
  if bIsDevel
    rimraf COFFEE_TMP, ->
      process.exit 0
    return
  process.exit 0

###
# Error Handler
# 
# @param Error err
###
errorHandler = (err) ->
  gutil.log do err.toString
  unless bIsDevel
    process.exit 1

###
# Build Stylus
###
gulp.task 'stylus', ->
  gulp.src STYLUS_SRC
    .pipe plumber errorHandler
    # .pipe gulpif bIsDevel, newer STYLUS_SRC
    .pipe stylus use: [
      do jeet
      do rupture
    ]
    .pipe autoprefixer browsers: ['last 4 versions']
    .pipe gulpif not bIsDevel, do csso # Compress CSS only for production
    .pipe gulp.dest STYLUS_DEST
    .pipe gulpif bIsDevel, do livereload

###
# Transform YAML files
###
# gulp.task 'yaml', ->
#   browserify

###
# Build CoffeeScript with Browserify
###
gulp.task 'coffee', ->
  browserify COFFEE_SRC,
    transform: [cjsx]
    extensions: ['.cjsx', '.coffee']
    insertGlobals: yes
    debug: bIsDevel
  .bundle()
  .pipe plumber errorHandler
  .pipe source 'common.js'
  .pipe do vinylBuffer
  .pipe gulpif not bIsDevel, do uglify # Optimize JS for production
  .pipe gulp.dest COFFEE_DEST
  .pipe gulpif bIsDevel, do livereload

###
# Optimizing SVG.
###
gulp.task 'svg', ->
  gulp.src SVG_SRC
    .pipe plumber errorHandler
    .pipe do svgmin
    .pipe gulp.dest SVG_DEST

###
# Refreshing page with livereload
# 
# Note: Do not use this task directly.
###
gulp.task 'refresh', ->
  gulp.src "#{THEME_PATH}/views/**/*.jade"
    .pipe newer "#{THEME_PATH}/views/**/*.jade"
    .pipe do livereload

###
# Devel task with gulp.watch and livereload
# 
# Run: gulp devel
###
gulp.task 'devel', ->
  do livereload.listen
  bIsDevel = yes
  gulp.watch "#{STYLUS_SRC_DIR}/**/*.styl", ['stylus']
  gulp.watch [
    "#{COFFEE_SRC_DIR}/**/*.coffee"
    "#{CJSX_SRC}"
  ], ['coffee']
  gulp.watch SVG_SRC, ['svg']
  gulp.watch "#{THEME_PATH}/views/**/*.jade", ['refresh']

gulp.task 'build', ['svg', 'stylus', 'coffee']

gulp.task 'default', ['build']
