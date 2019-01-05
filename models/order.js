module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
<<<<<<< HEAD
    // Giving the Order model a name of type STRING
    shopifyId: DataTypes.STRING,
    status: DataTypes.STRING,
=======
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        'New Order',
        'Delivery Pending',
        'Delivery Scheduled',
        'Delivery Completed',
        'Order Cancelled'
      ],
      allowNull: true,
    }
>>>>>>> master
  });
  

  Order.associate = function (models) {
    // Associating Order with Posts
    // When an Order is deleted, also delete any associated Posts
    Order.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Order;
};