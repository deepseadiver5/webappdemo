const mongoose = require('mongoose');

// don't need to connect to db in this file

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: [String],
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

//compile the model with the schema
const Product = mongoose.model('Product', productSchema);

//export for use elsewhere in app
module.exports = Product;