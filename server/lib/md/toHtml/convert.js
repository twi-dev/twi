import {expose} from "threads"

import html from "remark-html"
import remark from "remark"

const md = remark().use(html, {sanitize: true})

/**
 * @param {string} content
 *
 * @return {Promise<string>}
 */
const convert = content => md.process(content)

expose(convert)
