const jwt = require('jsonwebtoken');


const fetchUser = (req, res, next) => {
    // Get user from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }   
    try {
        const data = jwt.verify(token, "randomString");
        req.user = data.user;
        next(); 
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }   
    
}
module.exports = fetchUser;