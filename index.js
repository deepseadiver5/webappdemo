
// rework this as a to do list with Bootstrap cards
// use images - save hrefs
// time and date to complete
// consider different fields

const express = require('express');

const methodOverride = require('method-override');

const app = express();
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// index route
app.get('/products', async (req, res) => {
   let { category } = req.query;
    if (category) {
        // category = category.charAt(0).toUpperCase() + category.slice(1);
        const data = await Product.find({ category });
        res.render('index', { products: data, category });
    }
    else {
        const data = await Product.find();
        // console.log(data);
        res.render('index', { products: data, category: 'All'});
    }

});

//cleaner version of the index
// app.get('/products', async (req, res) => {
//     const { category } = req.query;
//     const filter = category ? { category } : {};
//     const data = await Product.find(filter);
//     res.render('index', { products: data, category: category || 'All' });
// });


// show the form to create a new product
app.get('/products/new', (req, res) => {
    res.render('new');
});

// create a new product
app.post('/products/new', async (req, res) => {
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    await product.save();
    res.render('show', { product: product });
});

// delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    // or const product = Product.findByIdAndDelete({id});
    await Product.deleteOne({ _id: id });
    const data = await Product.find();
    res.redirect('/products');
})

// show one route
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Product.findOne({ _id: id });
    // also have the findbyID method - findById(id)
    // console.log(id);
    res.render('show', { product: data });
});

// update a product
app.get('/products/:id/edit', async (req, res) => {
    console.log('getting edit');
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product });
})

app.patch('/products/:id/edit', async (req, res) => {
    console.log("Updating page reached");
    const { id } = req.params;
    const { name, price, category } = req.body;

    //update entru in database
    await Product.findById(id).updateOne({ name, price, category });
    // or const product = await Product.findByIdAndUpdate({id}, {req.body}, {runValidators: true, new: true});
    res.redirect('/products');
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});