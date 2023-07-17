const { Category } = require('../model/Category')

exports.fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

exports.createCategory = async (req, res) => {
    try {
        const categories = new Category(req.body);
        const category = await categories.save();
        res.status(200).json(category);
    }
    catch (err) {
        res.status(400).json(err);
    }
}