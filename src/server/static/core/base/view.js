const view = app => async function render(path, opts) {
  this.body = await app.renderToHTML(
    this.req, this.res, path, this.query, {...opts}
  )
}

export default view
