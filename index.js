require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');

server.use(cors({
    exposedHeaders : ['X-Total-Count']
}));
// to parse re.body
server.use(express.json());

// Routers base path 
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);


const main = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.wbgmmxq.mongodb.net/ecommerce?retryWrites=true&w=majority`);
        console.log('Database connected')
    }
    catch (err) {
        console.log(err)
    }
}

main();

server.listen(process.env.PORT || 8000, () => {
    console.log('server connected')
})