module.exports = {
  user: async(parent, { id }, { User }) => await User.findById(id),
  users: async(parent, args, { User, Member, Seller }) =>{
    const user = await User.find({})
    const member = await Member.findOne({ userId: user._id })
    const seller = await Seller.findOne({ userId: user._id })
    console.log(member)
    const returnData = [...user,member,seller]
    return [...user,member,seller]
  },
  activeUser: async(parent, args, { activeUser, User}) => {
    if(!activeUser){
      return null;
    }
    return await User.findOne({ "credentials.token": activeUser.credentials.token });
  },
}