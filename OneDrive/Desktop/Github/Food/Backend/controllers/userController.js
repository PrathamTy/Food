import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false, message:"User Does Not Exists"})
        }
        const Match = await bcrypt.compare(password,user.password)
        if(!Match) {
            return res.json({success:false, message:"Invalid Credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})            
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const createToken = (id)=> {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res) => {

    const {name,email,password} = req.body
    try {
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false,message:"User Already Exists"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //encrypting
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
export {loginUser,registerUser}