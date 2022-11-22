module.exports = {
  categories: async(parent,args, { Category }) => await Category.find({}),
  category: async(parent,{ id }, { Category }) => await Category.findById(id)
}