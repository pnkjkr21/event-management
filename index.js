const express = require("express");
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const authRoutes = require("./routers/authRoutes/auth")
const eventRoutes = require("./routers/eventRoutes/event")


const app = new express();


app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/", authRoutes)
app.use("/events", eventRoutes)




mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database connected!!")
}).catch((err)=>{
  console.log("Error connecting DB", err)
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
