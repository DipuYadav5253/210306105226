const { getProductsFromEcommerce } = require('../services/ecommerceService');

const getTopProducts = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await getProductsFromEcommerce(category);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTopProducts };
