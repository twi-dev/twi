/**
 * Set next.js view renderer to the context
 *
 * @param next.Server next – an instance of next.js server
 */
const view = next => async function render(path, opts) {
  const query = {
    query: this.query,
    params: this.params
  }

  this.body = await next.renderToHTML(
    this.req, this.res, path, query, {
      ...opts
    }
  )
}

export default view
