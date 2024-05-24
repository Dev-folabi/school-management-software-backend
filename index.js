const config = require('config')
const cors = require('cors')
const express = require("express")
const mongoose = require('mongoose')
const register = require('./routes/auth/register.route')
const login = require('./routes/auth/login.route')

require("dotenv")

const app = express();
app.use(cors())
app.use(express.json());

// if(!config.get(`${process.env.jwtPrivateKey}`)){
//     console.error('FATAL ERROR: jwtPrivateKey is not define.');
//     process.exit(1);
// }


// const dbUsername = config.get('username');
// const dbPassword = config.get('password');
// const dbName = 'edustack-sms'; 

const dbUsername = 'forlabi95'
const dbPassword = 'Aa19981421%3F'
const dbName = 'edustack-sms'

const dbURI ='mongodb+srv://edustack:12345@edustack-sms.rzf8erb.mongodb.net/?retryWrites=true&w=majority&appName=edustack-sms'
// process.env.MONGODB_URL;
mongoose.connect(dbURI)
    .then(() => console.log("DB connected"))
    .catch(err => console.error(`DB not connected... ${err.message}`));

// Register route
app.use('/api/register', register)

//Login route
app.use('/api/login', login)



const Port = 3001

app.listen(Port, ()=>{
    console.log(`server running on port ${Port}`)
})
