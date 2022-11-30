const OrdersUnion = {
  __resolveType(obj, context, info){
    if(obj.id){
      return 'OrderDto';
    }
    if(obj.message){
      return 'Message';
    }
    return null;
  },
}

module.exports = OrdersUnion;