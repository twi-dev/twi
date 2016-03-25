'use strict';

module.exports = function(oTypes){
  return {
    categoryId: {
      type: oTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: oTypes.STRING,
      allowNull: false
    },
    description: {
      type: oTypes.TEXT,
      allowNull: true
    }
  };
};