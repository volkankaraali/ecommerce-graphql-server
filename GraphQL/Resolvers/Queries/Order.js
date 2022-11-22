const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');


module.exports = {
  orders: async(parent, args, { OrderDetail, activeUser, activeUserType }) => {
    try {
      console.log(activeUser)
      if(!activeUser) return [{status:400,message: 'Access denied!'}]
      
      // 0 => Seller, 1 => Member
      if(activeUserType === 0) return [{status:403, message:'Unauthorized member!'}];

      const orderDetail = await OrderDetail.find({ memberId:activeUser._id })
      return orderDetail
      
    } catch (error) {
      return errorMessage(400,error)
    }
  },
  

  
}