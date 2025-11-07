import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js"
import AuthMiddleWare from "../Middleware/auth.js"

const cartRoute = express.Router()

cartRoute.post("/add",AuthMiddleWare,addToCart)
cartRoute.post("/remove",AuthMiddleWare,removeFromCart)
cartRoute.post("/get",AuthMiddleWare,getCart)
export default cartRoute;