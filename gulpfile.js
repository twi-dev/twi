// Common plugins
const gulp = require("gulp")
const gutil = require("gulp-util")
const watch = require("gulp-watch")
const plumber = require("gulp-plumber")

// Css
const stylus = require("gulp-stylus")
const poststylus = require("poststylus")
const csso = require("gulp-csso")
const rupture = require("rupture")
const jeet = require("jeet")

// SVG
const svgmin = require("gulp-svgmin")

// Stylus paths
const STYLUS_SRC_DIR = `${__dirname}/frontend/stylus`
const STYLUS_SRC = [`${STYLUS_SRC_DIR}/error/*.styl`]
const STYLUS_DEST = `${__dirname}/static/assets/css`

// SVG paths
const SVG_SRC = `${__dirname}/frontend/svg/**/*.svg`
const SVG_DEST = `${__dirname}/static/assets/img`

var isDev = false

function onError(err) {
  gutil.log(String(err))

  if (!isDev) {
    process.exit(1)
  }
}

gulp.task("env:dev", () => isDev = true)

gulp.task("stylus", () => {
  gulp.src(STYLUS_SRC)
    .pipe(plumber(onError))
    .pipe(stylus({
      "include css": true,
      use: [
        rupture(),
        jeet(),
        poststylus([
          "autoprefixer"
        ])
      ]
    }))
    .pipe(isDev ? gutil.noop() : csso())
    .pipe(gulp.dest(STYLUS_DEST))
})

gulp.task("svg", () => {
  const rebuildSvg = () => (
    gutil.log("Rebuild svg..."),
    gulp.src(SVG_SRC)
      .pipe(plumber(onError))
      .pipe(svgmin())
      .pipe(gulp.dest(SVG_DEST))
  )

  rebuildSvg()

  if (isDev) {
    watch(SVG_SRC, rebuildSvg)
  }
})

gulp.task("watch", ["env:dev", "svg"])

gulp.task("make", ["svg", "stylus"])

gulp.task("default", ["make"])

process
  .on("error", onError)
  .on("SIGINT", () => process.exit(0))
