var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var product = new Schema(
    {
        sNo: Number,
        name: String,
        brand: String,
        unitPrice: Number,
        base64img: String,
    }
);
module.exports = mongoose.model('Product', product);
