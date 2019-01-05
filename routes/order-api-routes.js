var db = require("../models");
var keys = require("../keys");
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "CARmex0711",
  database: "grasssales_db"
});

var currentDate = new Date();

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
    //connect to shopify to grab order information
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: keys.admin_key,
      password: keys.password
    });
  
    //loop through shopify json response & store the orders placed into orders table in mysql
    shopify.order.list({limit: 10})
      .then(function(orderInfo){
        for (var i = 0; i < orderInfo.length; i++){
        connection.query(
          "INSERT INTO Orders SET ?",
          {
            name: orderInfo[i].id,
            createdAt: currentDate,
            updatedAt: currentDate
          }
        )
      }
      })
      .catch(err => console.error(err));
      console.log("we can get orders");
     

  });
//get customer information from shopify
  app.get("/api/customers/", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    const Shopify = require('shopify-api-node');
    const shopify = new Shopify({
      shopName: 'bladesofgreen',
      apiKey: keys.admin_key,
      password: keys.password
    });

    //loop through customers from shopify & store it in table
    shopify.customer.list({limit: 50})
    .then(function(customerInfo){
      for (var i = 0; i < customerInfo.length; i++){
      connection.query(
        "INSERT INTO customers SET ?",
        {
          shopifyId: customerInfo[i].id,
          email: customerInfo[i].email,
          first_name: customerInfo[i].first_name,
          last_name: customerInfo[i].last_name
        }
      )
    }
    })
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
