const mongoose = require("mongoose") ;

const  User = mongoose.model("register",{
      
    FullName : {
      type :String ,
      require :1 
    },

    email : {
      type :String ,
      unique : [true,"this email was existe !! "],
      lowercase :true ,
      required:[true,"Email is required"],
    },
    password : {
        type :String 
    },
    role: {type: String}
    

})

module.exports = User ;