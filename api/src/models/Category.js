const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Nombre de categoría requerido"
        },
        len: {
          args: [[0, 20]],
          msg: 'El nombre de la categoría no puede superar los 20 caracteres'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    }
  });
};
