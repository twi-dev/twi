import Category from "model/Category"

import Tag from "./Tag"

Category.hasMany(Tag, {foreignKey: "categoryId"})

Tag.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: "set null"
})

export default Tag
