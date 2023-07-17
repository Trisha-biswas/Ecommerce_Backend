const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const response = await product.save();
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.fetchProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

exports.fetchAllProductsByFilter = async (req, res) => {
    //  filter = {"category" : ["smartphones","laptops"]}
    // sort = {_sort:"price",_order:"asc"}
    // pagination = {_page:1,_limit:5}
    let query = Product.find({});
    let totalProductsQuery = Product.find({});

    if (req.query.category) {
        query = query.find({ category: req.query.category })
        totalProductsQuery = totalProductsQuery.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand })
    }
    if (req.query._sort) {
        query = query.sort({ [req.query._sort]: req.query._order })
    }
    
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const totalProducts = await totalProductsQuery.count().exec();

    try {
        const products = await query.exec();
        res.set('X-Total-Count', totalProducts)
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}


exports.updateProduct = async(req,res) => {
    try{
      const products = await Product.findByIdAndUpdate(req.params.id, req.body,{new : true});
      res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ error: err })
    }

}