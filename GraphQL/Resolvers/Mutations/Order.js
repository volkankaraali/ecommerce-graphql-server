const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');


module.exports = {
  addOrder: async(parent, { data }, { OrderDetail,OrderItem, activeUser, activeUserType }) => {
    try {

      if(!activeUser) return errorMessage(400,'Access Denied!')

      // console.log(data)
      if(activeUserType === 0) return errorMessage(403,'Unauthorized member!')

      let total_price = 0;
      await data.map(({ price,quantity }) => {console.log(price);total_price += price*quantity}); 

      // create a order to orderDetails db.
      const createdOrderDetail = await new OrderDetail({ memberId:activeUser._id, total_price }).save();

      // create each order's item to OrderItem db
      data.map(async({ productId, quantity }) => {
        const newOrderItem = await new OrderItem({ order_detail_id: createdOrderDetail._id, productId, quantity }).save();
      })

      return successMessage(200,'Order created successfully!')

    } catch (error) {
      return errorMessage(400,error);
    }
  }
}