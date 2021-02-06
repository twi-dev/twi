import {spawn, Worker, Thread} from "threads"

/**
 * Compiles Markdown to plain text using remark and strip-markdown
 *
 * @param {string} text
 *
 * @return {Promise<string>}
 */
async function toText(text) {
  const convert = await spawn(new Worker("./convert"))

  /** @type {string} */
  const result = await convert(text).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => result)
}

export default toText
