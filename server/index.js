const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user',require('./user/userController'));
app.use('/admin',require('./admin/adminController'));

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
})