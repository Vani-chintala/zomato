
const express= require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

// import the routes
const userRoute = require('./routes/user')
const restaurantsRoute = require('./routes/restaurants')
const sampleAPI = require('./routes/sample')
const resroutes = require('./routes/route')


//expose env variables as process.env
require('dotenv').config();


//initialize the app
const app = express();
//use the cors
app.use(cors());

//listen to the routes
app.use('/user', userRoute);
app.use('/restaurants',restaurantsRoute)
app.use('/sample', sampleAPI)


//set the error handler
// call the error handler using next(msg)
app.use((err,req,res, next)=>{
    console.log(err.stack);
    res.status(500)
       .send('Something broke!')
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})



app.use(bodyParser.json())

app.use("/a", resroutes)


//listen the app at port
// get the post from the env
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`eator api running at ${port}`)
})


/* project razorpay [backend]
const express = require("express");
const bodyParser = require("body-parser");

const resroutes = require("./Routes/Route");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use("/", resroutes);

app.listen(8080, () => {
  console.log("server running at port 8080");
});
*/