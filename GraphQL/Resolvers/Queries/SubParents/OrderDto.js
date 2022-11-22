const OrderDto = {
  products: async(parent,args, { OrderItem, Product }) => {
    const orderItems = await OrderItem.find({ order_detail_id: parent._id }).populate("productId")
    const orderProducts = orderItems.map( item => {
      return {
        name:item.productId.name,
        price:item.productId.price,
        quantity:item.quantity,
      }
    });

    return orderProducts
  },

}

module.exports = OrderDto;