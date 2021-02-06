import {spawn, Worker, Thread} from "threads"

/**
 * Compiles Markdown to HTML using remark and remark-html
 *
 * @param {string} text
 *
 * @return {Promise<string>}
 */
async function toHtml(text) {
  const convert = await spawn(new Worker("./convert"))

  /** @type {string} */
  const result = await convert(text).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => result)
}

export default toHtml
