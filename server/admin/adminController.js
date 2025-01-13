const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken;')
const db = require('../db/index');
require('dotenv').config();

const adminSignUp = async(req, res) =>{
    const {name, email, phone , password} = req.body;

    if( !name || !email || !phone || !password ) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    try {
        const emailCheck = await db.query('SELECT * FROM admins WHERE email = $1',[email])
        if(emailCheck.rowCount > 0){
            return res.status(400).json({message:'Email already exists'});
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const result = await db.query(
                'INSERT INTO admins(name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING id, name, email, phone',[name,email,hashedPassword,phone]
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
    const { name, password } = req.body;
    try {
        if(!name || !password){
            return res.status(400).json({message:'Name and password are required'});
        }

        const adminQuery = await client.query('SELECT * FROM admin WHERE name = $1',[name]);
            if(adminQuery.rowCount === 0){
                res.status(400).json({message:'Admin not found'});
            }

            const admin = adminQuery.rowCount[0];

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
