const mongoose = require("mongoose") ;
const Msg = mongoose.model("Msgs",{
     publisher : {
          type : String ,
          trim : true ,
          uppercase : true
     },
     reciver : {
          type : String ,
          trim : true ,
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