const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');

module.exports = {
  getAllProducts: async(parent, args, { Product }) => await Product.find({}),
  getProductById: async(parent, { id }, { Product }) => {
    try {
      const product = await Product.findOne({_id:id});
      if(product)
        return successMessage(200,'Product is finded.',product);
      else 
        return errorMessage(400,'Product doesnt exist.');
      
    } catch (error) {
      return errorMessage(400,error)
    }
  },
  getProductsBySeller: async(parent, args, { Product, activeUser, activeUserType }) => {
    try {
      if(!activeUser) return errorMessage(400,'Access Denied!')

      // 0 => Seller, 1 => Member
      if(activeUserType === 1) return errorMessage(403,'Unauthorized!');
      return await Product.find({ sellerId: activeUser._id });
    } catch (error) {
      return errorMessage(400,error)
    }
  } 
}