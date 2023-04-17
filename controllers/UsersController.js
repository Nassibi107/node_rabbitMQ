const User = require("../Modules/UserModule");
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken");
const { model, models } = require("mongoose");

exports.register = async (req,res) => {
       try {
            data = req.body  ;
            usr = new User (data) ;
           salt = bcrypt.genSaltSync(10) ;
        cryptedPass = await bcrypt.hashSync(data.password,salt) ;
        usr.password =cryptedPass ;
        usr.save() ;
        res.status(200).send(cryptedPass)
       } catch (error) {
             res.send(error) ;
       }
         
}

exports.login =  async  (req,res) => {
   
      data = req.body ;
      user = await User.findOne({email:data.email})
      if (!user) {
            res.status(404).send("email or password invalid !");
      }else {
            validPass = bcrypt.compareSync(data.password ,user.password)
           if (!validPass) {
                res.status(401).send("email or password invalid !");
           }else {
               payload = {
                  _id :user._id ,
                  email :user.email ,
                  Fullname : user.FullName,
                  role :user.role
               },
               token =jwt.sign(payload ,"0618",{expiresIn:"2h"})
               res.status(200).send({myToken : token})
           }
      }


}


