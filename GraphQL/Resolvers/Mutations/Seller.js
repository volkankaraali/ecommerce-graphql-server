const token = require('../../../Utils/Token');
const bcrypt = require('bcrypt');
const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');

module.exports = {
  sellerRegister: async(parent, { data: { email, password, companyName } },{ User, Seller } ) => {
    try {
      const user = await User.findOne({ email });
      if(user) return errorMessage(400, 'User already exists!');

      const passwordHash = await bcrypt.hashSync(password,12);
      const newUser = await new User({ email, password:passwordHash }).save();
      const newSeller = await new Seller({ companyName, address:"", telNo:"", userId:newUser._id}).save();

      const tokenCode = await token.generete(newUser, "168h");

      newUser.credentials.token = tokenCode;
      newUser.save();

      const data = {
        companyName,
        email
      }
      return successMessage(200,'User successfully created.', data);

    } catch (error) {
      return errorMessage(400,error);
    }
  },

  updateSeller: async(parent, { data: { email, password, companyName, telNo, address }}, { Seller,User,activeUser,activeUserType }) => {
    try {
      
      if(!activeUser) return errorMessage(400,'Access Denied!')

      // 0 => Seller, 1 => Member
      if(activeUserType === 1) return errorMessage(403,'Unauthorized seller!');

      const user = await User.findById(activeUser);
      const seller = await Seller.findOne({ userId: user._id });

      email ? user.email = email : false;
      password ? user.password = password : false;
      user.save();

      companyName ? seller.companyName = companyName : false;
      telNo ? seller.telNo = telNo : false;
      address ? seller.address = address : false;
      seller.save();

      return successMessage(200, 'Updated!')

    } catch (error) {
      return errorMessage(400,error);
    }
  }

}