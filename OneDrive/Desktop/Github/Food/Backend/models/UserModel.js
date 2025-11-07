import moongose from "mongoose"

const userSchema = new moongose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel = moongose.models.user || moongose.model("user",userSchema)
export default userModel;