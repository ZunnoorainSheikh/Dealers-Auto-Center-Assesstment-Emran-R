const Product = require('../models/Product');

// @desc    Get all products with pagination, search, and sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || '';
    const sort = req.query.sort || 'default';
    const skip = (page - 1) * limit;

    // Build search filter
    let searchFilter = {};
    if (search.trim()) {
      searchFilter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build sort order
    let sortOrder = { createdAt: -1 };
    switch (sort) {
      case 'price-asc':
        sortOrder = { price: 1 };
        break;
      case 'price-desc':
        sortOrder = { price: -1 };
        break;
      case 'name-asc':
        sortOrder = { title: 1 };
        break;
      case 'name-desc':
        sortOrder = { title: -1 };
        break;
      default:
        sortOrder = { createdAt: -1 };
    }

    // Get products with pagination
    const products = await Product.find(searchFilter)
      .sort(sortOrder)
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const total = await Product.countDocuments(searchFilter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: products.length,
      page,
      totalPages,
      total,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts };
