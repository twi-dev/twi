import {expose} from "threads"

import strip from "strip-markdown"
import remark from "remark"

// TODO: Make sure to strip HTML tags too. See: https://github.com/remarkjs/strip-markdown/issues/14
const compiler = remark().use(strip)

/**
 * Compiles Markdown to plain text using remark and strip-markdown
 *
 * @param {string} content
 *
 * @return {Promise<string>}
 */
const convert = text => compiler.process(text)

expose(convert)
