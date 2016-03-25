'use strict';

/**
 * Структура таблицы пользователей
 *
 * @return object
 */
module.exports = function(oTypes) {
  return {
    userId: {
      type: oTypes.INTEGER(12),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    login: {
      type: oTypes.STRING(32),
      unique: true,
      allowNull: false
    },
    password: {
      type: oTypes.STRING,
      allowNull: false
    },
    email: {
      type: oTypes.STRING,
      unique: true,
      allowNull: false
    },
    about: {
      type: oTypes.TEXT,
      allowNull: true
    },
    registeredAt: {
      type: oTypes.DATE,
      allowNull: false,
      defaultValue: oTypes.NOW
    },
    role: {
      type: oTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0 // User by default
    },
    status: {
      type: oTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0 // Inactive by default
    }
  };
};