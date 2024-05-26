// const config = require('config')
const cors = require('cors')
const express = require("express")
const mongoDB = require('./config/db')
const register = require('./routes/auth/register.route')
const login = require('./routes/auth/login.route')

require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json());

if(!process.env.jwtPrivateKey){
    console.error('FATAL ERROR: jwtPrivateKey is not define.');
    process.exit(1);
}



// Register route
app.use('/api/register', register)

//Login route
app.use('/api/login', login)



const Port = process.env.PORT

mongoDB()
app.listen(Port, ()=>{
    console.log(`server running on port ${Port}`)
})
