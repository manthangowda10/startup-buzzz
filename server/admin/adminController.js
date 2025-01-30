const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../db/index');
const Joi = require('joi');

require('dotenv').config();



const adminSignUp = async(req, res) =>{

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({ message:error.details[0].message });
    }

    const {name, email, phone , password} = req.body;

    try {
        const emailCheck = await db.query('SELECT * FROM admin WHERE email = $1',[email])
        if(emailCheck.rowCount > 0){
            return res.status(400).json({message:'Email already exists'});
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const result = await db.query(
                'INSERT INTO admin(name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING id, name, email, phone',[name,email,hashedPassword,phone]
            );
            return res.status(200).json({message:'Admin account created successfully',
                admin: result.rows[0]
            });
    } catch (error) {
        console.error('Error during admin signup',error.message);
        res.status(500).json({message:'Internal server error'});
    }
}

const adminLogin = async (req,res) =>{

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(3).required()
    })

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    const { name, password } = req.body;
    try {
        
        const adminQuery = await db.query('SELECT * FROM admin WHERE name = $1',[name]);
            if(adminQuery.rowCount === 0){
                res.status(400).json({message:'Admin not found'});
            }

            const admin = adminQuery.rows[0];

            if(!admin.is_active){
                res.status(403).json({message:'Admin is inactive'});
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if(!isPasswordValid){
                return res.status(404).json({message:'Password is invalid'});
            } 

            const token = jwt.sign(
                {id: admin.id, role: admin.role},
                process.env.JWT_SECRET,
                { expiresIn:'1h'}
            )

            return res.status(200).json({message:'Admin logged in successfully', 
                admin: {id: admin.id, name: admin.name, role: admin.role},
                token
            });

    } catch (error) {
        console.error('Error loggin in admin:',err.message);
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports = { adminSignUp,adminLogin }
