var db = require("../models");

module.exports = function(app) {
  app.get("/api/orders", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Order.findAll({
      include: [db.Post]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.get("/api/orders/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Order.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.post("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

};
