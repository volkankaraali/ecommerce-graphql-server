const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');


module.exports = {
  addParentCategory: async(parent, { data: { name } },{ ParentCategory }) => {
    try {
      const parentCategory = await ParentCategory.findOne({ name });

      if(parentCategory) return errorMessage(403,'Category already exists!');

      const newParentCategory = await new ParentCategory({ name }).save();

      return successMessage(200,'Category added successfully!',newParentCategory);
      
    } catch (error) {
      return errorMessage(400,error)
    }
  },
  addSubCategory: async(parent, { data: { name, parentCategoryId }}, { ParentCategory, SubCategory }) => {
    try {
      const subCategory = await SubCategory.findOne({name});

      if(subCategory) return errorMessage(403,'Category already exists!');

      const newSubCategory = await new SubCategory({ name, parentCategoryId }).save();
      
      return successMessage(200,'Category added successfully!',newSubCategory);

    } catch (error) {
      return errorMessage(400,error)
    }
  }
}