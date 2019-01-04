var db = require("../models");
var keys = require("../keys");

//pull list from heroku of all orders
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

//pull list of all orders from api

  app.get("/api/shopifyOrders/", function(req, res) {
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: apikey.admin_key,
      password: keys.admin_password,
    });
  
    shopify.order.list({limit: 50})
      .then(orders => console.log(orders))
      .catch(err => console.error(err));
      console.log("we can get orders");
  });

  //pull list of all customers from api

  app.get("/api/customers/", function(req, res) {
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: keys.admin_key,
      password: keys.admin_password,
    });

    shopify.customer.list({limit: 50})
      .then(customers => console.log(customers))
      .catch(err => console.error(err));
      console.log("we can get customers");
  });

//sequelize database

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
