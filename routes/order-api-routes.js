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

  app.get("/api/shopifyOrders/", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: '8de57b0da65fac53f03737d4a52af4fa',
      password: '4b04f890429deeaf8087b83824210736'
    });
  
    shopify.order.list({limit: 10})
      .then(orders => console.log(orders))
      .catch(err => console.error(err));
      console.log("we can get orders");
  });

  app.get("/api/customers/", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: '8de57b0da65fac53f03737d4a52af4fa',
      password: '4b04f890429deeaf8087b83824210736'
    });

    shopify.customer.list({limit: 50})
      .then(customers => console.log(customers))
      .catch(err => console.error(err));
      console.log("we can get customers");
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
