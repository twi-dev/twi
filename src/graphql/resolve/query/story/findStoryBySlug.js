import Story from "darabase/model/Story"

const findStoryBySlug = async (_, {slug}) => await Story.findOneBySlug(slug)

export default findStoryBySlug
