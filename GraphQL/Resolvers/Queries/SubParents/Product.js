const Product = {
  category : async(parent, args, { Category }) => await Category.findById(parent.categoryId),
  brand: async(parent, args, { Brand }) => await Brand.findById(parent.brandId) 
}

module.exports = Product