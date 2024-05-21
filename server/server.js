const config = require('config')
const cors = require('cors')
const express = require("express")
const mongoose = require('mongoose')
const register = require('./routes/auth/register.route')
const login = require('./routes/auth/login.route')

const app = express();
app.use(cors())
app.use(express.json());

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not define.');
    process.exit(1);
}


mongoose.connect("mongodb://localhost/edustack_sms")
.then(()=> console.log("DB connected"))
.catch(err => console.error(`DB not connected... ${err.message}`))



// Register route
app.use('/api/register', register)

//Login route
app.use('/api/login', login)



const Port = 3001

app.listen(Port, ()=>{
    console.log(`server running on port ${Port}`)
})
