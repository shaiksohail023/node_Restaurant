const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleWare = (req, res, next) => {
    //check req header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({message: 'Token not found'});

    //extract the jwt token from the req headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    try{
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user info to req object
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({message: 'Invalid Token'});
    }
};

//Function to generate the JWT token
const generateToken = (userData) => {
    // generate a new JWT Token using userData
    // return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000}); 
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn: 3000}); 
    //expiresIn : 30 means token will expire in 30 seconds. it is not to used
    // in signup but we can used in login it is not mandatory.
}

module.exports = {jwtAuthMiddleWare, generateToken};