import generate from "../__helper__/generateCharacters"

const createCharacters = async t => t.context.generate = await generate()

export default createCharacters
