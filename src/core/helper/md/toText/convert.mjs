import {expose} from "threads"

import strip from "strip-markdown"
import remark from "remark"

const md = remark().use(strip)

const convert = content => md.process(content)

expose(convert)
