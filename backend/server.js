import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import Router from "./routes/index.js"
import connectDB  from "./database/connection.js"
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/v1",Router)

app.listen(process.env.PORT,async ()=>{
    try {
        const connection = await connectDB();
        console.log(`Server is listening on http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.error("❌ Server startup failed due to DB error");
    }
})