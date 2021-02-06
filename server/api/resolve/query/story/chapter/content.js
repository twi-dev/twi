import isFunction from "lodash/isFunction"

import toHtml from "server/lib/md/toHtml"
import toText from "server/lib/md/toText"

const representations = {
  html: toHtml,
  text: toText
}

/**
 * Returns chapter's content representation depending on given type.
 * Defaults to "markdown"
 *
 * @param {import("server/model/Chapter").default & {content: string}} chapter
 * @param {{as: "markdown" | "html" | "text"}} args
 */
function getContent(chapter, args) {
  /** @type {(text: string) => Promise<string>} */
  const transform = representations[args.as]

  if (!isFunction(transform)) {
    return chapter.content
  }

  return transform(chapter.content)
}

export default getContent
