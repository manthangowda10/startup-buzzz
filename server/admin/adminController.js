const bcrypt = require('bcrypt');
const db = require('../db/index');

const adminSignUp = async(req, res) =>{
    const {name, email, phone , password} = req.body;

    if( !name || !!email || !phone || !password ) {
        return res.status(400).json({ message: 'All fields are required'});
    }

    try {
        const emailCheck = db.query('SELECT * FROM admins WHERE email = $1',[email])
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

module.exports = { adminSignUp }
