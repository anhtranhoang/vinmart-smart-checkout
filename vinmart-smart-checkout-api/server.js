var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/vinmart-smart-checkout-product-list', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Product = require('./model/product');

//Allow all requests from all domains & localhost
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.post('/products', function(request, response) {
    var product = new Product();
    product.sNo = request.body.sNo;
    product.name = request.body.name;
    product.brand = request.body.brand;
    product.unitPrice = request.body.unitPrice;
    product.base64img = request.body.base64img;
    product.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.send(savedProduct);
       }
    });
});

app.get('/products', function(request, response) {

    Product.find({},function(err, products) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(products);
        }
    });
});

app.listen(3001, function (req, res) {
    console.log("Server up and running on port 3001...");
});
