import {prompt as _prompt} from "inquirer"
import log from "server/core/log"

import isString from "lodash/isString"
import isPlainObject from "lodash/isPlainObject"
import mapObject from "server/core/helper/util/mapObject"
import objectIterator from "server/core/helper/util/objectIterator"

const isArray = Array.isArray

const normalizeQuestions = obj => mapObject(obj, function(question) {
  if (isPlainObject(question)) {
    return normalizeQuestions(question)
  }

  if (isArray(question)) {
    return question
  }

  return [{
    type: "input",
    message: String(question)
  }]
})

async function tryPrompt(question) {
  while (true) {
    try {
      return await _prompt(isArray(question) ? question : [question])
    } catch (err) {
      if (!isString(err)) {
        throw err
      }

      log.error(err)
    }
  }
}

async function processQuestions(q) {
  const res = {}

  for (const [key, question] of objectIterator.entries(q)) {
    if (isPlainObject()) {
      res[key] = await processQuestions(question)
      continue
    }

    question[0].name = key
    res[key] = (await tryPrompt(question))[key]
  }
}

const prompt = async obj => await processQuestions(normalizeQuestions(obj))

export default prompt
