module.exports = (oTypes) ->
  categoryId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  name:
    type: oTypes.STRING
    allowNull: no
    unique: yes
