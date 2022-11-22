const Member = require("../Models/Member");
const Seller = require("../Models/Seller");
const User = require("../Models/User");
const { errorMessage } = require("./ResponseMessage");

const authMiddleware = async(req) => {
  const userToken = req?.headers["access-token"];

  if(userToken){
    try {
      const user = await User.findOne({ 'credentials.token': userToken });
      const isMember = await Member.findOne({userId: user?._id});
      const isSeller = await Seller.findOne({userId: user?._id});
      
      if(isMember){
        req.activeUser = user;
        req.activeUserType = 1;
        return req;
      }
      if(isSeller){
        req.activeUser = user;
        req.activeUserType = 0;
        return req;
      }

      if(!isSeller || !isMember){
        throw Error('Access denied!')
      }

    } catch (error) {
      console.log(error);
      return errorMessage(400,error);
    }
  }

  return false;
}


module.exports = { authMiddleware }