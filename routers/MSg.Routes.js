const express = require("express") ;
const Msg = require("../controllers/MsgController") ;
const auth = require("../middleware/auth") ;
const verifyRole = require("../middleware/verify") ;
const route= express.Router() ;
route.get("/",(req,rep) =>{
   rep.send("hello In •myStoreOFb♥♥ks•")
})
route.post("/sends",auth.verifyToken,Msg.addMsg) ;
route.get("/all",auth.verifyToken,verifyRole.verifyRole,Msg.getAllMsg) ;
route.get("/one/:id",auth.verifyToken,Msg.getOneMsg) ;
// route.route("/all",auth).get(Msg.getAll) ;
route.get("/show/:reciver",auth.verifyToken,Msg.yourMsg) ;
route.put("/btw/:reciver/:publisher",auth.verifyToken,Msg.ReciverMsg) ;
route.delete("/del/:id",auth.verifyToken,Msg.DeleteMsg) ;
route.post("/send",Msg.SendOne) ;

module.exports =route;