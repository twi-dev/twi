import util from "util"

import create from "core/helper/decorator/createDecorator"

const deprecate = (msg, code) => create(fn => util.deprecate(fn, msg, code))

export default deprecate
