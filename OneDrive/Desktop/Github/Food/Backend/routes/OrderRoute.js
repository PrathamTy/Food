import express from "express"
import AuthMiddleWare from "../Middleware/auth.js"
import { listOrders, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router()
orderRouter.post("/place",AuthMiddleWare,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",AuthMiddleWare,userOrders)
orderRouter.get("/list",listOrders)

export default orderRouter