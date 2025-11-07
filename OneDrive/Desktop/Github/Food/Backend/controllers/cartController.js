import userModel from "../models/UserModel.js"

const addToCart = async(req,res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success: true, message:req.body})
    } catch (error) {
        res.json({success:false,message:"EAA"})
    }
}

const removeFromCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:"Removed from cart"})
    } catch (error) {
        res.json({success:false, message:{error}})        
    }
}

const getCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cart = userData.cartData
        res.json({success:true, cart})
    } catch (error) {
        res.json({success:false, error})
    }
}

export {addToCart,removeFromCart,getCart}