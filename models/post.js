module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    // A Post should belong to an Order
    // A Post can't be created without an Order due to the foreign key constraint
    Post.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
