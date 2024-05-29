const cors = require('cors');
const express = require('express');
const mongoDB = require('./config/db');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.JWT_PRIVATE_KEY) {
    console.error('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
    process.exit(1);
}


app.use('/api/admin', require('./routes/user/admin.route'));
app.use('/api/staff', require('./routes/user/staff.route'));
app.use('/api/role', require('./routes/role.route'));
app.use('/api/login', require('./routes/user/login.route'));

const port = process.env.PORT || 3000;

mongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
