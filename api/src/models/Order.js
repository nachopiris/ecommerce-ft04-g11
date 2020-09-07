const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM({
        values: [
          "shopping_cart",
          "created",
          "processing",
          "canceled",
          "completed",
        ],
      }),
      allowNull: false,
      defaultValue: "shopping_cart",
    },
  });
};
