import partial from "lodash/partial"

import serialize from "core/helper/graphql/serialize"
import waterfall from "core/helper/array/runWaterfall"
import create from "core/helper/decorator/createDecorator"
import normalize from "core/helper/graphql/normalizeParams"

/**
 * Bind given resolver with improved parameters API.
 *
 * @param {function} resolver
 *
 * @return {function}
 */
const bindResolver = create(fn => (
  normalize(partial(waterfall, [fn, serialize]))
))

export default bindResolver
