import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'
import foodRouter from "./routes/FoodRoute.js"
import userRouter from "./routes/userRoutes.js"
import "dotenv/config"
import cartRoute from "./routes/cartRoute.js"
import orderRouter from "./routes/OrderRoute.js"
const app = express()
const port = 4000

//Middleware init
app.use(express.json())
app.use(cors())

//db
connectDB();
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=> {
    res.send("HELLO")
})

app.listen(port,()=> {
    console.log("listening...")
})