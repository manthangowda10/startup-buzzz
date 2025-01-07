const jwt = require('jsonwebtoken');
const client = require('../db/index');

module.exports = async(req, res , next) =>{
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        return res.status(401).json({message:"Access denied, No token provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_secret);
        req.user = decoded;

        const result = await client.query("SELECT * FROM users WHERE id = $1",[decoded.id]);
        if(result.rows.length === 0){
            return res.status(401).json({message: "Invalid token."});
        }
        next();
    } catch (error) {
        res.status(400).json({message:"Invalid token"});
    }
}