module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    // Giving the Order model a name of type STRING
    name: DataTypes.STRING
  });

  Order.associate = function(models) {
    // Associating Order with Posts
    // When an Order is deleted, also delete any associated Posts
    Order.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Order;
};
