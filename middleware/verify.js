const jwt = require("jsonwebtoken");

exports.verifyRole = (req, res, next) => {
 
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(403).send("no token")

    }
    try{
        const decoded = jwt.verify(token , process.env.TOKEN_KEY);
        if (decoded.role !== "Admin") {
            res.status(401).send("you can't acess to this data")
        }else {
             return next();
        }
    }catch(err){
        return res.status(401).send("invalid token");
    }
}