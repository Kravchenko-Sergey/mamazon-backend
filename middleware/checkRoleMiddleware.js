const jwt = require("jsonwebtoken");

module.exports = (role) => {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                res.status(401).json({message: 'Unauthorized'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role) {
                return  res.status(403).json({message: 'You do not have the required entry rights'})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
}