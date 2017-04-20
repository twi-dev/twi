/**
 * Set next.js view renderer to the context
 *
 * @param next.Server next – an instance of next.js server
 */
const view = next => async function render(path, opts) {
  this.body = await next.renderToHTML(
    this.req, this.res, path, this.query, {...opts}
  )
}

export default view
