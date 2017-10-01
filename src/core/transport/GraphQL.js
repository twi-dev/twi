import {isAbsolute, resolve} from "path"

import {readFile} from "promise-fs"
import {GraphQLClient} from "graphql-request"

import isString from "lodash/isString"

import normalizePath from "core/helper/util/normalizePath"
import bind from "core/helper/util/bind"

const PARENT_DIRNAME = module.parent.filename
delete require.cache[__filename] // eslint-disable-line

const normalize = normalizePath.curry([".graphql", ".gql"])

class Client extends GraphQLClient {
  constructor(options = {}) {
    const url = options.url
    let dir = options.dir

    delete options.url
    delete options.dir

    super(url, options)

    if (dir) {
      dir = isAbsolute(dir) ? dir : resolve(PARENT_DIRNAME, dir)
    }

    this.__dir = dir
    this.__cache = new Map()

    this.request = bind(this, this.request)
  }

  __readRequestFile = async path => {
    if (this.__dir && isString(this.__dir)) {
      path = resolve(this.__dir, path)
    }

    if (!isAbsolute(path)) {
      path = resolve(PARENT_DIRNAME, path)
    }

    path = await normalize(path)

    if (this.__cache.has(path)) {
      return this.__cache.get(path)
    }

    const query = await readFile(path)

    return this.__cache.set(path, query).get(path)
  }

  /**
   * Send GraphQL request from a file
   *
   * @param {string} path – path to a file with request
   * @param {object} [variables = {}]
   *
   * @return {object}
   */
  async request(path, variables = {}) {
    const query = await this.__readRequestFile(path)

    return await super.request(query, variables)
  }
}

export default Client
