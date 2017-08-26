// Based on: https://github.com/koajs/cors
// Status: EXPERIMENTAL, NOT TESTED

const isArray = Array.isArray

const defaults = {
  allowMethods: [
    "GET",
    "HEAD",
    "PUT",
    "POST",
    "DELETE",
    "PATCH"
  ]
}

/**
 * CORS middleware
 *
 * @param {object} options
 */
function cors(options) {
  options = {
    ...defaults, ...options
  }

  if (isArray(options.exposeHeaders)) {
    options.exposeHeaders = options.exposeHeaders.join(",")
  }

  if (isArray(options.allowMethods)) {
    options.allowMethods = options.allowMethods.join(",")
  }

  if (isArray(options.allowHeaders)) {
    options.allowHeaders = options.allowHeaders.join(",")
  }

  if (options.maxAge) {
    options.maxAge = String(options.maxAge)
  }

  options.credentials = Boolean(options.credentials)

  options.keepHeadersOnError = (
    options.keepHeadersOnError === undefined ||
    Boolean(options.keepHeadersOnError)
  )

  return async function corsMiddleware(ctx, next) {
    // If the Origin header is not present terminate this set of steps.
    // The request is outside the scope of this specification.
    const requestOrigin = ctx.get("Origin")

    // Always set Vary header
    // https://github.com/rs/cors/issues/10
    ctx.vary("Origin")

    if (!requestOrigin) {
      return await next()
    }

    let origin

    if (typeof options.origin === "function") {
      const origin = await options.origin(ctx)

      if (!origin) {
        return await next()
      }
    } else {
      origin = options.origin || requestOrigin
    }

    const headersSet = {}

    function set(key, value) {
      ctx.set(key, value)
      headersSet[key] = value
    }

    if (ctx.method !== "OPTIONS") {
      // Simple Cross-Origin Request, Actual Request, and Redirects
      set("Access-Control-Allow-Origin", origin)

      if (options.credentials === true) {
        set("Access-Control-Allow-Credentials", "true")
      }

      if (options.exposeHeaders) {
        set("Access-Control-Expose-Headers", options.exposeHeaders)
      }

      if (!options.keepHeadersOnError) {
        return await next()
      }

      try {
        await next()
      } catch (err) {
        err.headers = {
          ...err.headers, ...headersSet
        }

        throw err
      }
    } else {
      // Preflight Request

      // If there is no Access-Control-Request-Method header
      // or if parsing failed,
      // do not set any additional headers and terminate this set of steps.
      // The request is outside the scope of this specification.
      if (!ctx.get("Access-Control-Request-Method")) {
        // this not preflight request, ignore it
        return await next()
      }

      ctx.set("Access-Control-Allow-Origin", origin)

      if (options.credentials === true) {
        ctx.set("Access-Control-Allow-Credentials", "true")
      }

      if (options.maxAge) {
        ctx.set("Access-Control-Max-Age", options.maxAge)
      }

      if (options.allowMethods) {
        ctx.set("Access-Control-Allow-Methods", options.allowMethods)
      }

      let allowHeaders = options.allowHeaders
      if (!allowHeaders) {
        allowHeaders = ctx.get("Access-Control-Request-Headers")
      }
      if (allowHeaders) {
        ctx.set("Access-Control-Allow-Headers", allowHeaders)
      }

      ctx.status = 204
    }
  }
}

const configureCors = () => cors({
  allowMethods: [
    "GET", "POST"
  ]
})

export default configureCors
