const UserUnion = {
  __resolveType(obj, context, info){
    if(obj.seller){
      return 'SellerUser';
    }
    if(obj.member){
      return 'MemberUser';
    }
    return null;
  },
}

module.exports = UserUnion;