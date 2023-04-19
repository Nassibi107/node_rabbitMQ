const express = require ("express") ;
const app = express() ;
const con_W_db = require("./config/Connect");
const amqp = require('amqplib');

require("dotenv/config");
app.use(express.json());
// con_W_db.connect;
const Port =  process.env.Basic_port_serv  || process.env.saving_port_serv
app.get ("/" , (req,rep) => {
  rep.send("hello world ♥")
} )

app.use(express.urlencoded({ extended: true }));







app.use("/messanger",require("./routers/MSg.Routes"));
app.use("/users",require("./routers/User.Routes"));
app.listen(Port ,()=> {
  console.log(`example app is running on  http://localhost:${Port}`)
})