const token = require('../../../Utils/Token');
const bcrypt = require('bcrypt');
const { errorMessage, successMessage } = require('../../../Utils/ResponseMessage');

module.exports = {
  memberRegister: async(parent, { data: { email, password, name, surname } },{ User, Member } ) => {
    try {
      const user = await User.findOne({ email });
      if(user) return errorMessage(400, 'User already exists!');

      const passwordHash = await bcrypt.hashSync(password,12);
      const newUser = await new User({ email, password:passwordHash }).save();
      const newMember = await new Member({ name, surname, address:"", telNo:"", userId:newUser._id }).save();

      const tokenCode = await token.generete(newUser, "168h");
      
      newUser.credentials.token = tokenCode;
      newUser.save();

      // return successMessage(200,'User successfully created.', { name, email });
      return {status:200,message:'User successfully created.', data:{ name, email }}

    } catch (error) {
      return errorMessage(400,error);
    }
  },

  updateMember: async(parent, { data: { email, password, name, surname, telNo, address }}, { Member,User,activeUser,activeUserType }) => {
    try {
      if(!activeUser) return errorMessage(400,'Access Denied!');

      // 0 => Seller, 1 => Member
      if(activeUserType === 0) return errorMessage(403,'Unauthorized member!');

      const user = await User.findById(activeUser);
      const member = await Member.findOne({ userId: user._id });

      email ? user.email = email : false;
      password ? user.password = password : false;
      user.save();

      name ? member.name = name : false;
      surname ? member.surname = surname: false;
      telNo ? member.telNo = telNo : false;
      address ? member.address = address : false;
      member.save();

      return successMessage(200, 'Updated!')

    } catch (error) {
      return errorMessage(400,error);
    }
  }

}