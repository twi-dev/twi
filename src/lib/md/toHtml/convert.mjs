import {expose} from "threads"

import html from "remark-html"
import remark from "remark"

const md = remark().use(html)

const convert = content => md.process(content)

expose(convert)
