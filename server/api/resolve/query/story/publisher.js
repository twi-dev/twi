/**
 * Returns the story's publisher
 *
 * @param {import("server/model/Story").default} story
 *
 * @return {Promise<import("server/model/User").default}
 */
const getPublisher = story => story.publisher ?? story.getPublisher()

export default getPublisher
