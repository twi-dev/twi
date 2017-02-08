import {readFile} from "promise-fs"
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
import objectIterator from "./objectIterator"

const TWI_ROOT = process.cwd()

function mapAssets(assets, type) {
  if (!type) {
    throw new TypeError("Asset type cannot be empty.")
  }

  if (!isString(type)) {
    throw new TypeError("Asset type should be a string.")
  }

  const res = []

  for(const bundle of objectIterator(assets)) {
    const asset = bundle[type]

    if (!isEmpty(asset)) {
      res.push(asset)
    }
  }

  return res
}

async function getAssets() {
  const assets = JSON.parse(
    String(await readFile(`${TWI_ROOT}/config/runtime/assets.json`))
  )

  return type => mapAssets(assets, type)
}

export default getAssets
