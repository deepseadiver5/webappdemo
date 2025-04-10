// file to run to get data into database

const mongoose = require('mongoose');

const Product = require('./models/product')

// const tempSeedData = require('./tempseeddata.json');

// const cat = ['fruit', 'vegetable', 'dairy'];

// for(let item of tempSeedData){
//     item.category = cat[Math.floor(Math.random() * 3).toFixed()];
// }

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });

Product.insertMany([
    {name: 'apple', price: 0.50, category: 'fruit'},
    {name: 'pear', price: 0.70, category: 'fruit'},
    {name: 'potato', price: 0.30, category: 'vegetable'},
    {name: 'carrot', price: 0.10, category: 'vegetable'},
    {name: 'milk', price: 0.90, category: 'dairy'}
])
.then((res) => {
    console.log(res);
})
.catch((e) => {
    console.log(e);
})

// Product.insertMany(tempSeedData);