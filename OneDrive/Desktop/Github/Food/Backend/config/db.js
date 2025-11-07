import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://tyagipratham007:tiwgSFTwSJb-%25s3@cluster0.fqlqzxo.mongodb.net/Food?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("Connected")})
}