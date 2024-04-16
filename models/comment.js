const Sequelize = require('sequelize');

const sequelize = require('../config/db');

const blogComment = sequelize.define('blogcomment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}
);

module.exports = blogComment;
