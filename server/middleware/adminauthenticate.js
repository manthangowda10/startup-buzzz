const jwt = require('jsonwebtoken')
require('dotenv').config();
const client = require('../db/index');

const adminAuthenticate = async(req, res, next)=> {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Access denied, no token provided'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const result = await client.query("SELECT * FROM admin WHERE id= $1",[decoded.id]);
        if(result.rowCount === 0){
            return res.status(400).json({message:'Admin not found'});
        }
        const admin = result.rows[0];
        if(!admin.is_active){
            return res.status(403).json({message:'Admin in inactive'});
        }
        req.admin = {
            id: admin.id,
            name: admin.name,
            role:admin.role
        }

        next();
    } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({message:'Invalid token'});
        }
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({message:'token has expired'});
        }
        console.error('Error in admin authenticate',error.message);
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports = {adminAuthenticate};