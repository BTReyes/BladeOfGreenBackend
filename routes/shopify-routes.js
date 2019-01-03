
// var path = require("path");
// var keys = require("../keys.js");
// var jquery = require('jquery');

// module.exports = function(app) {

//   var orderUrl ='https://' + "8de57b0da65fac53f03737d4a52af4fa" + ":" + "4b04f890429deeaf8087b83824210736" + "@bladesofgreen.myshopify.com/admin/orders.json";
 
//   $.ajax({
//     url: orderUrl,
//     method: "GET"
//   }).then(function(response) {
//     $("#customer-info").text(JSON.stringify(response));
//   });

   
// app.get('/backend', (req,res) => {
//   const shop = admin_key
//   if (shop) {
//     const state = nonce();
//     const testUrl = 'https://' + shop + ":" + password + '@bladesofgreens.myshopify.con/admin/customers/1001/orders.json';
//     res.cookie('state', state);
//     res.redirect(testUrl);
//   } else {
//     return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
//   }
// });

// shopify install route

// app.get('/shopify', (req, res) => {
//     const shop = admin_key
//     if (shop) {
//       const state = nonce();
//       const redirectUri = forwardingAddress + '/shopify/callback';
//       const installUrl = 'https://' + shop +
//         '/admin/oauth/authorize?client_id=' + password +
//         '&scope=' + scopes +
//         '&state=' + state +
//         '&redirect_uri=' + redirectUri;
  
//       res.cookie('state', state);
//       res.redirect(installUrl);
//     } else {
//       return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
//     }
//   });


//   // shopify callback route

//   app.get('/shopify/callback', (req, res) => {
//     const { shop, hmac, code, state } = req.query;
//     const stateCookie = cookie.parse(req.headers.cookie).state;
  
//     if (state !== stateCookie) {
//       return res.status(403).send('Request origin cannot be verified');
//     }
  
//     if (shop && hmac && code) {
//       // DONE: Validate request is from Shopify
//       const map = Object.assign({}, req.query);
//       delete map['signature'];
//       delete map['hmac'];
//       const message = querystring.stringify(map);
//       const providedHmac = Buffer.from(hmac, 'utf-8');
//       const generatedHash = Buffer.from(
//         crypto
//           .createHmac('sha256', shared_secret)
//           .update(message)
//           .digest('hex'),
//           'utf-8'
//         );
//       let hashEquals = false;
  
//       try {
//         hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
//       } catch (e) {
//         hashEquals = false;
//       };
  
//       if (!hashEquals) {
//         return res.status(400).send('HMAC validation failed');
//       }
  
//       res.status(200).send('HMAC validated');

//       // TODO
//       // Exchange temporary code for a permanent access token
//         // Use access token to make API call to 'shop' endpoint
//     } else {
//       res.status(400).send('Required parameters missing');
//     }
//   });

//  };
