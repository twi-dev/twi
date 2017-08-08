import generate from "nanoid/generate"
import alphabet from "nanoid/url"

const slug = (len = 8) => generate(alphabet, len)

export default slug
