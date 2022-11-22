const User = require('./User');
const Member = require('./Member');
const Seller = require('./Seller');
const Product = require('./Product');
const Order = require('./Order');

const Mutation = {
  ...User,
  ...Member,
  ...Seller,
  ...Product,
  ...Order,
};

module.exports = Mutation;