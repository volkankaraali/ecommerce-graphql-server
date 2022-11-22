const bcrypt = require('bcrypt');
const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');

module.exports = {
  login: async(parent, { data: { email, password } }, { User, Member, Seller }) => {
    try {
      const user = await User.findOne({ email });

      if(!user) return errorMessage(400,'User does not exist!');

      const checkPassword = await bcrypt.compareSync(password, user.password);
      if(!checkPassword) return errorMessage(400,'E-email or Password is incorrect!');

      const member = await Member.findOne({ userId:user._id });
      const seller = await Seller.findOne({ userId:user._id });

      console.log(user)
      const data = { token: user?.credentials?.token, userType: member && "1" || seller && '0'};

      // return { token: user?.credentials?.token, userType: member && "1" || seller && '0'};
      return successMessage(200,'Login succesfull',data)

    } catch (error) {
      return errorMessage(400, error);
    }
  }
}