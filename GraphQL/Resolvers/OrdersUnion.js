const OrdersUnion = {
  __resolveType(obj, context, info){
    if(obj.total_price){
      return 'OrderDto';
    }
    if(obj.message){
      return 'Message';
    }
    return null;
  },
}

module.exports = OrdersUnion;