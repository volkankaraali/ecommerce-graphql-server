module.exports = {
  user: async(parent, { id }, { User }) => await User.findById(id),
  activeUser: async(parent, args, { activeUser, User, Member, Seller }) => {
    if(!activeUser){
      return null;
    }
    const user = await User.findOne({ "credentials.token": activeUser.credentials.token });
    const member = await Member.findOne({ userId: user._id });
    const seller = await Seller.findOne({ userId: user._id });

    return member ? {
      id:user._id,
      ...user.toObject(),
      member:{...member?.toObject()},
      userType: 1
    } :
    {
      id:user._id,
      ...user.toObject(),
      seller:{...seller?.toObject()},
      userType: 0
    }
  },
}