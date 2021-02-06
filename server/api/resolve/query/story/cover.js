/**
 * Returns the story's cover if exists
 *
 * @param {import("server/model/Story").default} story
 *
 * @return {Promise<import("server/model/File").default>}
 */
const getCover = story => story.cover ?? story.getCover()

export default getCover
