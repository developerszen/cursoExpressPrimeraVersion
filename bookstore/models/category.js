'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: "El tamaño del texto no es correcto"
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    slug: DataTypes.STRING
  }, {});

  SequelizeSlugify.slugifyModel(category, {
    source: ['name']
  });

  category.associate = function(models) {
     category.belongsTo(models.user, {
      as: 'userCreator',
      foreignKey: 'created_by'
    });
    category.belongsTo(models.user, {
      as: 'userEditor',
      foreignKey: 'updated_by'
    });
  };
  return category;
};