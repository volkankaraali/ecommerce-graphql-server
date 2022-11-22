const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');


module.exports = {
  addProduct: async(parent, { data: { name, price, imageUrl, categoryId, brandId, stock }}, { Product, activeUser, activeUserType }) => {
    try {

      if(!activeUser) return errorMessage(400,'Access Denied!');

      // 0 => Seller, 1 => Member
      if(activeUserType === 1) return errorMessage(403,'Unauthorized!')

      if(activeUserType === 0){
        const newProduct = await new Product({ name, price, imageUrl, sellerId:activeUser._id,imageUrl, categoryId, brandId,  stock}).save();
        return successMessage(200,'Product saved successfully.', newProduct);
      }
    } catch (error) {
      return errorMessage(400,error)
    }
  },

  deleteProduct: async(parent, { id }, { Product, activeUser, activeUserType }) => {
    try {

      if(!activeUser) return errorMessage(400,'Access Denied!');

      // 0 => Seller, 1 => Member
      if(activeUserType === 1) return errorMessage(403,'Unauthorized seller!')

      if(activeUserType === 0){
        const product = await Product.findOne({ _id:id }); 

        if(product.sellerId.toString() === activeUser._id.toString()){
          product.deleteOne();
          if(product?.deletedCount === 0)
            return errorMessage(400,'No found product!')
          else
            return successMessage(200,'Product deleted successfully.');
        }
        
      }
    } catch (error) {
      return errorMessage(400,error)
    }
  },

  updateProduct: async(parent, { data: { id, name, price, imageUrl, stock} }, { Product, activeUser, activeUserType }) => {
    try {
      
      if(!activeUser) return errorMessage(400,'Access Denied!');

      // 0 => Seller, 1 => Member
      if(activeUserType === 1) return errorMessage(403,'Unauthorized seller!')

      if(activeUserType === 0){
        const product = await Product.findOne({ _id:id }); 

        if(product.sellerId.toString() === activeUser._id.toString()){
          // update
          product.name = name;
          product.price = price; 
          product.imageUrl = imageUrl;
          product.stock = stock;
          product.save();

          return successMessage(200,'Product updated.');
        }
        
      }
    } catch (error) {
      return errorMessage(400,error)
    }
  }

}