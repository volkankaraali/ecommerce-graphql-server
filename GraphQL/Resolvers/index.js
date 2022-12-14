const Mutation = require('./Mutations');
const Query = require('./Queries');

const OrdersUnion = require('./OrdersUnion');
const UserUnion = require('./UserUnion');

const Product = require('./Queries/SubParents/Product');
const OrderDto = require('./Queries/SubParents/OrderDto');

module.exports = { Query, Mutation, Product, OrderDto, OrdersUnion, UserUnion };