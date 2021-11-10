// create a exporess server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

connectDB();


//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));
//add routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));