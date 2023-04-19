const mongoose = require("mongoose") ;
const Msg = mongoose.model("msgs",{
     publisher : {
          type : String ,
          trim : false ,
          uppercase : true
     },
     reciver : {
          type : String ,
          trim : false ,
          uppercase : true
     },
     type : String ,
     seen : {
          default : 0 ,
          type : Boolean
     },
     content :String

})


module.exports = Msg ;