'use strict';

const SequelizeSlugify = require('sequelize-slugify')

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      primaryKey:true,
      autoIncrement:true,
      type: DataTypes.INTEGER
    },
    isbn: DataTypes.STRING(20),
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    url_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fk_category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      allowNull: false,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Error en el tipo de dato del id del usuario"
          }
        }
      },
      created_at: DataTypes.DATE,
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Error en el tipo de dato del id del usuario"
          }
        }
      },
      updated_at: DataTypes.DATE,

    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  SequelizeSlugify.slugifyModel(book, {
    source: ['title']
  })

  book.searchBook = function(search, limit, offset) {
    var queryBase = `select * from books where is_deleted=false and title like '%${search}%'`

    var query = `${queryBase}
      limit ${limit} offset ${offset}`

    var queryCount = `select count(*) total from (${queryBase}) v`

    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      .then(data => {
        return sequelize.query(queryCount, { type: sequelize.QueryTypes.SELECT })
          .then(count => {
            return { data: data, count: count}
          })
          .catch(error => {
            return error;
          })
      })
      .catch(error => {
        return error;
      })
  }

  book.associate = function(models) {
    book.belongsTo(models.category, {
      foreignKey: 'fk_category'
    });
    book.belongsTo(models.user, {
      as: 'userCreator',
      foreignKey: 'created_by'
    });
    book.belongsTo(models.user, {
      as: 'userEditor',
      foreignKey: 'updated_by'
    });
    book.belongsToMany(models.author, {
      through: 'author_book',
      foreignKey: 'fk_book',
      otherKey: 'fk_author'
    })
  };
  return book;
};