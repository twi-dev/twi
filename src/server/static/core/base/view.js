const view = next => async function render(path, opts) {
  this.body = await next.renderToHTML(
    this.req, this.res, path, this.query, {...opts}
  )
}

export default view
