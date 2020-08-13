'use strict';

const SequelizeSlugify = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: DataTypes.STRING,
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER

  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  SequelizeSlugify.slugifyModel(author, {
    source: ['name']
  })

  author.associate = function(models) {
    author.belongsTo(models.user, {
      as: 'userCreator',
      foreignKey: 'created_by'
    });
    author.belongsTo(models.user, {
      as: 'userEditor',
      foreignKey: 'updated_by'
    });
    author.belongsToMany(models.book, {
      through: 'author_book',
      foreignKey: 'fk_author',
      otherKey: 'fk_book'
    });
  };
  return author;
};