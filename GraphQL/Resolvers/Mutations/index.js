const User = require('./User');
const Member = require('./Member');
const Seller = require('./Seller');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');

const Mutation = {
  ...User,
  ...Member,
  ...Seller,
  ...Product,
  ...Order,
  ...Category,
};

module.exports = Mutation;