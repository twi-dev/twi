import generate from "nanoid/generate"
import url from "nanoid/url"

const alpabet = url.replace(/~/g, "")

const nanoid = size => generate(alpabet, size || 8)

export default nanoid
