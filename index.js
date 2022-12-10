const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const GraphQLJSON = require('graphql-type-json');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require("graphql-import");

const path = require('path');

require('dotenv').config();

// auth middleware
const { authMiddleware } = require('./Utils/Auth');

// models
const User = require('./Models/User');
const Seller = require('./Models/Seller');
const Member = require('./Models/Member');
const Product = require('./Models/Product');
const Brand = require('./Models/Brand');
const { ParentCategory, SubCategory } = require('./Models/Category');
const OrderDetail = require('./Models/OrderDetail');
const OrderItem = require('./Models/OrderItem');


const corsOptions = {
  origin:true, // http://localhost:3000
  credentials:true
};

async function startServer(){
  await mongoose
    .connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:process.env.MONGO_DATABASE_NAME
    })
    .then(() => console.log('connected mongodb'))
    .catch(err => console.log(err))
  
  const app = express();

  app.use(bodyParser.json());
  app.all('/', async(req, res)  =>  res.json({ status: 200, message: 'welcome ecommerce servers' }));


  const resolveFunctions = {
    JSON: GraphQLJSON,
  };


  const server = new ApolloServer({
    typeDefs : importSchema(path.join(__dirname,'GraphQL/index.graphql')),
    resolvers : require('./GraphQL/Resolvers/'),
    resolveFunctions,
    introspection: true,
    cors:corsOptions,
    context : async({ req }) => {
      const { activeUser, activeUserType } = await authMiddleware(req);
      if(activeUser){
        return {
          User,
          Member,
          Seller,
          Product,
          Brand,
          ParentCategory, 
          SubCategory,
          OrderDetail,
          OrderItem,
          activeUser,
          activeUserType
        }
      }
      return {
        User,
        Seller,
        Member,
        Product,
        ParentCategory, 
        SubCategory,

      }
      
    }
  });


  await server.start();
  server.applyMiddleware({app, cors:corsOptions})

  app.listen(process.env.port || 2023, async () => {
    console.log(`server is runnig on http://localhost:${process.env.port || 2023}${server.graphqlPath}`)
  })

}

startServer();