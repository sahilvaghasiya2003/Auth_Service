const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/index');
// const UserRepository = require('./repository/user-repository')
//  const UserService = require('./services/user-service')

const app = express();

const prepareAndStartServer = () => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use("/api", apiRoutes);

  app.listen(PORT, async() => {
    console.log("server started");
    // const repo = new UserRepository();
    // const service = new UserService();
    // const response = await repo.getById(1);
    // console.log(response);
    // const newToken = service.createToken({email:'sahil@gmail.com',id:5});
    // console.log(newToken)
    // const verify = service.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaGlsQGdtYWlsLmNvbSIsImlkIjo1LCJpYXQiOjE3MjI3NDYyMTIsImV4cCI6MTcyMjkxOTAxMn0.1thBYqx2eGTlzbqK4D3GpBJWKVRYYltwJnjNKN1Vv9M');
    // console.log(verify)
  
  });
};

prepareAndStartServer();
