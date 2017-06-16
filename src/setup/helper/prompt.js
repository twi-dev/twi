import inquirer from "inquirer"
import log from "system/log"

import isString from "lodash/isString"
import isPlainObject from "lodash/isPlainObject"

import mapObject from "system/helper/iterator/sync/mapObject"
import objectIterator from "system/helper/iterator/sync/objectIterator"

const isArray = Array.isArray

const normalizeQuestions = obj => mapObject(obj, question => {
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
      return await inquirer.prompt(isArray(question) ? question : [question])
    } catch (err) {
      if (!isString(err)) {
        throw err
      }

      log.error(err)
    }
  }
}

async function processQuestions(questions) {
  const res = {}

  for (const [key, question] of objectIterator.entries(questions)) {
    if (isPlainObject(question)) {
      res[key] = await processQuestions(question)
      continue
    }

    question[0].name = key
    res[key] = (await tryPrompt(question))[key]
  }

  return res
}

const prompt = async obj => await processQuestions(normalizeQuestions(obj))

export default prompt
