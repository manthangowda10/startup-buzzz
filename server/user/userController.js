const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})


const signup = (req,res) => {
    const {error} = signupSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    } 
    res.status(201).json({message: "User signed up successfully"});


}
const login = (req, res) => {
    const{ error } = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message})
    }
    res.status(200).json({message: "User logged in successfully"});
}

module.exports = { signup, login}