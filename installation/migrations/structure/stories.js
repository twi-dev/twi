'use strict';

/**
 * Структура таблицы фанфиков
 */
 module.exports = function(oTypes) {
  return {
    storyId: {
      type: oTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: oTypes.STRING,
      allowNull: false
    },
    isItTranslation: {
      type: oTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    publishedAt: {
      type: oTypes.DATE,
      allowNull: false,
      defaultValue: oTypes.NOW
    },
    isFinished: {
      type: oTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  };
};