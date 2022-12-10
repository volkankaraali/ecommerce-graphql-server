const { errorMessage, successMessage } = require("../../../Utils/ResponseMessage");

module.exports = {
  categories: async(parent,args, { SubCategory }) => {
    try {
      const categoriesData = [];
      
      const subCategories = await SubCategory.find({}).populate('parentCategoryId');

      subCategories.map(({ name, parentCategoryId }) => {
        const isParentCategoryExists = categoriesData.some(item => item.parentCategory === parentCategoryId.name);
        
        if(isParentCategoryExists){
          const index = categoriesData.findIndex(item => item.parentCategory === parentCategoryId.name);
          categoriesData[index].subCategories = [...categoriesData[index].subCategories,name]
        }
        else {
          categoriesData.push({ parentCategory:parentCategoryId.name, subCategories:[name]})
        }
      });

      return successMessage(200,'Categories listed successfully!', categoriesData)
    } catch (error) {
      return errorMessage(400,error);
    }
  
  },
  
}