const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
 
    const token = req.hedears.authorization;
    
     console.log(token);

    if(!token){
        return res.status(403).send("no token")

    }
    try{
        const decoded = jwt.verify(token , process.env.TOKEN_KEY);
        console.log(decoded)
        req.user = decoded;

    }catch(err){
        return res.status(401).send("invalid token");
    }
    return next();
}