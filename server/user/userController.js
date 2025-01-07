const Joi = require('joi');//Validating library Joi
const bcrypt = require('bcrypt');
const { createUser, findUserByName } = require('../db/queries');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username:Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})


const signup = async (req,res) => {
    const {error} = signupSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    } 
    const { name,email,password,username, phone } = req.body;

    try {
        const existingUser = await findUserByName(username,email);
        if(existingUser){
            if(existingUser.username === username){
                return res.status(400).json({ message: 'Username is already taken' });
            }
            if(existingUser.email === email){
                return res.status(400).json({message:'Email is already registered'});
            }
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await createUser(name,email, hashedPassword, username, phone);

            res.status(201).json({message:"User signed up successfully",user:newUser})
        
    } catch (error) {
        console.error('Error doing signup',err.stack);
        res.status(500).json({message:"Intenal server error"});
    }

}
const login = async (req, res) => {
    const{ error } = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message})
    }
    const { email, password } = req.body;
    try {
        const user = await findUserByName(null,email)
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: '1h'})

        res.status(200).json({
            message:"User logged in successfully", 
            user: { id: user.id, username:user.username },
            token
        })
    } catch (error) {
        console.error('Error during login', err.stack);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = { signup, login}