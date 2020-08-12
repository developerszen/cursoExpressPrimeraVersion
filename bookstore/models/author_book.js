'use strict';
module.exports = (sequelize, DataTypes) => {
  const authorBook = sequelize.define('author_book', {
    fk_book: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    fk_book: {
      type: DataTypes.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    },
    
  }, {
    tableName: 'author_book',
    timestamps: false,
  });
  authorBook.associate = function(models) {
    // associations can be defined here
  };
  return authorBook;
};